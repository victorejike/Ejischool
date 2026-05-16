package httpapi

import (
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
