package httpapi

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/ejischool/ejischool/services/api/internal/config"
)

func TestHealth(t *testing.T) {
	router := NewRouter(config.Config{Environment: "test", HTTPAddr: ":0"})
	req := httptest.NewRequest(http.MethodGet, "/healthz", nil)
	rec := httptest.NewRecorder()

	router.ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d", rec.Code)
	}
}

func TestTutorialNotFound(t *testing.T) {
	router := NewRouter(config.Config{Environment: "test", HTTPAddr: ":0"})
	req := httptest.NewRequest(http.MethodGet, "/v1/tutorials/missing", nil)
	rec := httptest.NewRecorder()

	router.ServeHTTP(rec, req)

	if rec.Code != http.StatusNotFound {
		t.Fatalf("expected status 404, got %d", rec.Code)
	}
}

func TestAITutorRespondsWithProgressContext(t *testing.T) {
	router := NewRouter(config.Config{Environment: "test", HTTPAddr: ":0"})
	body := bytes.NewBufferString(`{"courseSlug":"html","courseTitle":"HTML Tutorial","currentTopic":"HTML Introduction","question":"I am stuck","secondsSpent":73,"completedTopics":1,"totalTopics":4}`)
	req := httptest.NewRequest(http.MethodPost, "/v1/ai/tutor", body)
	rec := httptest.NewRecorder()

	router.ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d", rec.Code)
	}

	var payload aiTutorResponse
	if err := json.NewDecoder(rec.Body).Decode(&payload); err != nil {
		t.Fatalf("decode response: %v", err)
	}
	if payload.Answer == "" || payload.NextAction == "" {
		t.Fatalf("expected answer and next action, got %#v", payload)
	}
}

func TestAdminCourseUpdateRequiresBearerToken(t *testing.T) {
	router := NewRouter(config.Config{Environment: "test", HTTPAddr: ":0", JWTIssuer: "test", JWTSecret: "secret"})
	body := bytes.NewBufferString(`{"title":"HTML Tutorial","level":"Beginner","description":"Updated"}`)
	req := httptest.NewRequest(http.MethodPut, "/v1/courses/html", body)
	rec := httptest.NewRecorder()

	router.ServeHTTP(rec, req)

	if rec.Code != http.StatusUnauthorized {
		t.Fatalf("expected status 401, got %d", rec.Code)
	}
}

func TestAdminSignupRequiresCode(t *testing.T) {
	router := NewRouter(config.Config{Environment: "test", HTTPAddr: ":0", JWTIssuer: "test", JWTSecret: "secret", AdminSignupCode: "invite"})
	body := bytes.NewBufferString(`{"email":"admin@example.com","password":"secret1","role":"admin","adminCode":"wrong"}`)
	req := httptest.NewRequest(http.MethodPost, "/v1/auth/signup", body)
	rec := httptest.NewRecorder()

	router.ServeHTTP(rec, req)

	if rec.Code != http.StatusForbidden {
		t.Fatalf("expected status 403, got %d", rec.Code)
	}
}
