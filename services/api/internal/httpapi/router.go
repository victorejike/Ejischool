package httpapi

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/ejischool/ejischool/services/api/internal/auth"
	"github.com/ejischool/ejischool/services/api/internal/config"
	"github.com/ejischool/ejischool/services/api/internal/database"
	"github.com/ejischool/ejischool/services/api/internal/learning"
	"github.com/ejischool/ejischool/services/api/internal/playground"
	"github.com/ejischool/ejischool/services/api/internal/realtime"
	"golang.org/x/crypto/bcrypt"
)

type api struct {
	cfg       config.Config
	learning  *learning.Service
	auth      *auth.Service
	compiler  *playground.Service
	db        *sql.DB
	events    *realtime.Hub
	startedAt time.Time
}

func NewRouter(cfg config.Config) http.Handler {
	db, err := database.Open(context.Background(), cfg.DatabaseURL)
	if err != nil {
		panic(fmt.Sprintf("database connection failed: %v", err))
	}
	learningService := learning.NewService()
	if err := learning.SeedCourses(context.Background(), db, learning.DefaultCourses(learningService.ListTutorials())); err != nil {
		panic(fmt.Sprintf("database seed failed: %v", err))
	}

	app := &api{
		cfg:       cfg,
		learning:  learningService,
		auth:      auth.NewService(cfg.JWTIssuer),
		compiler:  playground.NewService(),
		db:        db,
		events:    realtime.NewHub(),
		startedAt: time.Now().UTC(),
	}

	mux := http.NewServeMux()
	mux.HandleFunc("GET /healthz", app.health)
	mux.HandleFunc("GET /v1/tutorials", app.listTutorials)
	mux.HandleFunc("GET /v1/tutorials/", app.getTutorial)
	mux.HandleFunc("GET /v1/courses", app.listCourses)
	mux.HandleFunc("GET /v1/courses/", app.courseBySlug)
	mux.HandleFunc("GET /v1/events", app.eventsStream)
	mux.HandleFunc("POST /v1/auth/signup", app.signup)
	mux.HandleFunc("POST /v1/auth/login", app.login)
	mux.HandleFunc("POST /v1/ai/tutor", app.aiTutor)
	mux.HandleFunc("POST /v1/playground/run", app.runCode)
	mux.HandleFunc("POST /v1/exercises/submit", app.submitExercise)

	return securityHeaders(cors(mux))
}

func (a *api) health(w http.ResponseWriter, r *http.Request) {
	databaseStatus := "disabled"
	if a.db != nil {
		databaseStatus = "connected"
	}
	writeJSON(w, http.StatusOK, map[string]any{
		"status":      "ok",
		"service":     "ejischool-api",
		"environment": a.cfg.Environment,
		"database":    databaseStatus,
		"startedAt":   a.startedAt,
	})
}

func (a *api) listTutorials(w http.ResponseWriter, r *http.Request) {
	if a.db != nil {
		courses, err := learning.ListCourses(r.Context(), a.db)
		if err != nil {
			writeError(w, http.StatusInternalServerError, "could not list courses")
			return
		}
		writeJSON(w, http.StatusOK, courses)
		return
	}
	writeJSON(w, http.StatusOK, a.learning.ListTutorials())
}

func (a *api) getTutorial(w http.ResponseWriter, r *http.Request) {
	slug := strings.TrimPrefix(r.URL.Path, "/v1/tutorials/")
	tutorial, ok := a.learning.GetTutorial(slug)
	if !ok {
		writeError(w, http.StatusNotFound, "tutorial not found")
		return
	}
	writeJSON(w, http.StatusOK, tutorial)
}

func (a *api) listCourses(w http.ResponseWriter, r *http.Request) {
	if a.db == nil {
		writeJSON(w, http.StatusOK, learning.DefaultCourses(a.learning.ListTutorials()))
		return
	}
	courses, err := learning.ListCourses(r.Context(), a.db)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "could not list courses")
		return
	}
	writeJSON(w, http.StatusOK, courses)
}

func (a *api) courseBySlug(w http.ResponseWriter, r *http.Request) {
	slug := strings.TrimPrefix(r.URL.Path, "/v1/courses/")
	if slug == "" {
		writeError(w, http.StatusNotFound, "course not found")
		return
	}

	switch r.Method {
	case http.MethodGet:
		a.getCourse(w, r, slug)
	case http.MethodPut:
		a.updateCourse(w, r, slug)
	default:
		writeError(w, http.StatusMethodNotAllowed, "method not allowed")
	}
}

func (a *api) getCourse(w http.ResponseWriter, r *http.Request, slug string) {
	if a.db == nil {
		tutorial, ok := a.learning.GetTutorial(slug)
		if !ok {
			writeError(w, http.StatusNotFound, "course not found")
			return
		}
		writeJSON(w, http.StatusOK, learning.CourseRecord{Slug: tutorial.Slug, Title: tutorial.Title, Language: tutorial.Language, Level: tutorial.Level, Description: tutorial.Description})
		return
	}
	course, err := learning.GetCourse(r.Context(), a.db, slug)
	if errors.Is(err, sql.ErrNoRows) {
		writeError(w, http.StatusNotFound, "course not found")
		return
	}
	if err != nil {
		writeError(w, http.StatusInternalServerError, "could not load course")
		return
	}
	writeJSON(w, http.StatusOK, course)
}

func (a *api) updateCourse(w http.ResponseWriter, r *http.Request, slug string) {
	if a.db == nil {
		writeError(w, http.StatusServiceUnavailable, "database is not configured")
		return
	}
	var req learning.CourseRecord
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid json body")
		return
	}
	course, err := learning.UpdateCourse(r.Context(), a.db, slug, req)
	if errors.Is(err, sql.ErrNoRows) {
		writeError(w, http.StatusNotFound, "course not found")
		return
	}
	if err != nil {
		writeError(w, http.StatusBadRequest, err.Error())
		return
	}
	a.events.Broadcast(fmt.Sprintf(`{"type":"course.updated","slug":%q,"title":%q}`, course.Slug, course.Title))
	writeJSON(w, http.StatusOK, course)
}

func (a *api) signup(w http.ResponseWriter, r *http.Request) {
	var req auth.SignupRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid json body")
		return
	}
	if a.db == nil {
		session, err := a.auth.Login(auth.LoginRequest{Email: req.Email, Password: req.Password})
		if err != nil {
			writeError(w, http.StatusBadRequest, err.Error())
			return
		}
		writeJSON(w, http.StatusCreated, session)
		return
	}
	email := strings.TrimSpace(strings.ToLower(req.Email))
	if email == "" || req.Password == "" || len(req.Password) < 6 {
		writeError(w, http.StatusBadRequest, "email and a 6 character password are required")
		return
	}
	role := req.Role
	if role == "" {
		role = "learner"
	}
	hash, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "could not secure password")
		return
	}
	_, err = a.db.ExecContext(r.Context(), `
		INSERT INTO users (email, name, password_hash, role)
		VALUES ($1, $2, $3, $4)
		ON CONFLICT (email) DO UPDATE
		SET name = EXCLUDED.name,
		    password_hash = EXCLUDED.password_hash,
		    role = EXCLUDED.role,
		    updated_at = now()
	`, email, req.Name, string(hash), role)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "could not create account")
		return
	}
	session, err := a.auth.Login(auth.LoginRequest{Email: email, Password: req.Password})
	if err != nil {
		writeError(w, http.StatusBadRequest, err.Error())
		return
	}
	a.events.Broadcast(fmt.Sprintf(`{"type":"user.signed_up","email":%q}`, email))
	writeJSON(w, http.StatusCreated, session)
}

func (a *api) login(w http.ResponseWriter, r *http.Request) {
	var req auth.LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid json body")
		return
	}

	if a.db != nil {
		var hash string
		email := strings.TrimSpace(strings.ToLower(req.Email))
		err := a.db.QueryRowContext(r.Context(), `SELECT password_hash FROM users WHERE email = $1`, email).Scan(&hash)
		if errors.Is(err, sql.ErrNoRows) {
			writeError(w, http.StatusUnauthorized, "invalid email or password")
			return
		}
		if err != nil {
			writeError(w, http.StatusInternalServerError, "could not load account")
			return
		}
		if err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(req.Password)); err != nil {
			writeError(w, http.StatusUnauthorized, "invalid email or password")
			return
		}
	}

	session, err := a.auth.Login(req)
	if err != nil {
		writeError(w, http.StatusUnauthorized, err.Error())
		return
	}

	writeJSON(w, http.StatusOK, session)
}

func (a *api) submitExercise(w http.ResponseWriter, r *http.Request) {
	var req learning.ExerciseSubmissionRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid json body")
		return
	}
	code := strings.TrimSpace(req.Code)
	result := learning.ExerciseSubmissionResult{Status: "failed", Score: 0, Hint: "Write a real answer before submitting."}
	if len(code) >= 20 && (strings.Contains(code, "function") || strings.Contains(code, "console") || strings.Contains(code, "<") || strings.Contains(code, "SELECT")) {
		result = learning.ExerciseSubmissionResult{Status: "passed", Score: 100, Hint: "Nice work. Your answer includes the expected structure."}
	}
	a.events.Broadcast(fmt.Sprintf(`{"type":"exercise.submitted","courseSlug":%q,"status":%q,"score":%.0f}`, req.CourseSlug, result.Status, result.Score))
	writeJSON(w, http.StatusOK, result)
}

type aiTutorRequest struct {
	CourseSlug      string `json:"courseSlug"`
	CourseTitle     string `json:"courseTitle"`
	CurrentTopic    string `json:"currentTopic"`
	Question        string `json:"question"`
	SecondsSpent    int    `json:"secondsSpent"`
	CompletedTopics int    `json:"completedTopics"`
	TotalTopics     int    `json:"totalTopics"`
}

type aiTutorResponse struct {
	Answer     string `json:"answer"`
	NextAction string `json:"nextAction"`
}

func (a *api) aiTutor(w http.ResponseWriter, r *http.Request) {
	var req aiTutorRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid json body")
		return
	}

	question := strings.TrimSpace(req.Question)
	if question == "" {
		writeError(w, http.StatusBadRequest, "question is required")
		return
	}

	courseTitle := strings.TrimSpace(req.CourseTitle)
	if courseTitle == "" {
		courseTitle = "this course"
	}
	topic := strings.TrimSpace(req.CurrentTopic)
	if topic == "" {
		topic = courseTitle
	}

	minutes := req.SecondsSpent / 60
	seconds := req.SecondsSpent % 60
	progress := fmt.Sprintf("I can see you have spent %dm %02ds here and reached %d/%d topics.", minutes, seconds, req.CompletedTopics, req.TotalTopics)
	if req.TotalTopics <= 0 {
		progress = "I am using your current lesson context to keep the guidance focused."
	}

	lowerQuestion := strings.ToLower(question)
	answer := fmt.Sprintf("For %s in %s, start with the smallest version of the idea. %s", topic, courseTitle, progress)
	nextAction := "Write one small answer or code change, then ask me to check the result."

	switch {
	case strings.Contains(lowerQuestion, "stuck") || strings.Contains(lowerQuestion, "confus") || strings.Contains(lowerQuestion, "error"):
		answer = fmt.Sprintf("You seem stuck around %s. %s First say what you expected, then compare it with what happened. Check one line or one concept at a time so the problem becomes visible.", topic, progress)
		nextAction = "Tell me the exact error, output, or sentence that does not make sense."
	case strings.Contains(lowerQuestion, "example") || strings.Contains(lowerQuestion, "sample"):
		answer = fmt.Sprintf("A useful %s example should have one input, one action, and one result. %s Keep it tiny first, then add a second case after the first one works.", topic, progress)
		nextAction = "Create the tiniest example you can, then extend it by one detail."
	case strings.Contains(lowerQuestion, "explain") || strings.Contains(lowerQuestion, "what is") || strings.Contains(lowerQuestion, "why"):
		answer = fmt.Sprintf("%s is best learned by separating the concept from the syntax. %s Name the concept in plain English, then point to the keyword, tag, selector, or command that performs it.", topic, progress)
		nextAction = "Rewrite the idea in your own words in one sentence."
	}

	a.events.Broadcast(fmt.Sprintf(`{"type":"ai.tutor","courseSlug":%q,"topic":%q}`, req.CourseSlug, topic))
	writeJSON(w, http.StatusOK, aiTutorResponse{Answer: answer, NextAction: nextAction})
}

func (a *api) eventsStream(w http.ResponseWriter, r *http.Request) {
	flusher, ok := w.(http.Flusher)
	if !ok {
		writeError(w, http.StatusInternalServerError, "streaming is not supported")
		return
	}
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")

	ch := a.events.Subscribe()
	defer a.events.Unsubscribe(ch)
	_, _ = fmt.Fprint(w, "event: ready\ndata: {\"status\":\"connected\"}\n\n")
	flusher.Flush()

	for {
		select {
		case <-r.Context().Done():
			return
		case msg := <-ch:
			_, _ = fmt.Fprintf(w, "event: message\ndata: %s\n\n", msg)
			flusher.Flush()
		case <-time.After(25 * time.Second):
			_, _ = fmt.Fprint(w, ": ping\n\n")
			flusher.Flush()
		}
	}
}

func (a *api) runCode(w http.ResponseWriter, r *http.Request) {
	var req playground.RunRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid json body")
		return
	}

	result, err := a.compiler.Run(r.Context(), req)
	if err != nil {
		writeError(w, http.StatusBadRequest, err.Error())
		return
	}

	writeJSON(w, http.StatusOK, result)
}

func writeJSON(w http.ResponseWriter, status int, payload any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(payload)
}

func writeError(w http.ResponseWriter, status int, message string) {
	writeJSON(w, status, map[string]string{"error": message})
}

func cors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func securityHeaders(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("X-Content-Type-Options", "nosniff")
		w.Header().Set("X-Frame-Options", "DENY")
		w.Header().Set("Referrer-Policy", "strict-origin-when-cross-origin")
		next.ServeHTTP(w, r)
	})
}
