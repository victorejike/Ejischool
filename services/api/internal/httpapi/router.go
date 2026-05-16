package httpapi

import (
	"encoding/json"
	"net/http"
	"strings"
	"time"

	"github.com/ejischool/ejischool/services/api/internal/auth"
	"github.com/ejischool/ejischool/services/api/internal/config"
	"github.com/ejischool/ejischool/services/api/internal/learning"
	"github.com/ejischool/ejischool/services/api/internal/playground"
)

type api struct {
	cfg       config.Config
	learning  *learning.Service
	auth      *auth.Service
	compiler  *playground.Service
	startedAt time.Time
}

func NewRouter(cfg config.Config) http.Handler {
	app := &api{
		cfg:       cfg,
		learning:  learning.NewService(),
		auth:      auth.NewService(cfg.JWTIssuer),
		compiler:  playground.NewService(),
		startedAt: time.Now().UTC(),
	}

	mux := http.NewServeMux()
	mux.HandleFunc("GET /healthz", app.health)
	mux.HandleFunc("GET /v1/tutorials", app.listTutorials)
	mux.HandleFunc("GET /v1/tutorials/", app.getTutorial)
	mux.HandleFunc("POST /v1/auth/login", app.login)
	mux.HandleFunc("POST /v1/playground/run", app.runCode)

	return securityHeaders(cors(mux))
}

func (a *api) health(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, map[string]any{
		"status":      "ok",
		"service":     "ejischool-api",
		"environment": a.cfg.Environment,
		"startedAt":   a.startedAt,
	})
}

func (a *api) listTutorials(w http.ResponseWriter, r *http.Request) {
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

func (a *api) login(w http.ResponseWriter, r *http.Request) {
	var req auth.LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid json body")
		return
	}

	session, err := a.auth.Login(req)
	if err != nil {
		writeError(w, http.StatusUnauthorized, err.Error())
		return
	}

	writeJSON(w, http.StatusOK, session)
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
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
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
