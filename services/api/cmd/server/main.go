package main

import (
	"log"
	"net/http"

	"github.com/ejischool/ejischool/services/api/internal/config"
	"github.com/ejischool/ejischool/services/api/internal/httpapi"
)

func main() {
	cfg := config.FromEnv()
	if err := cfg.Validate(); err != nil {
		log.Fatalf("invalid configuration: %v", err)
	}
	server := &http.Server{
		Addr:         cfg.HTTPAddr,
		Handler:      httpapi.NewRouter(cfg),
		ReadTimeout:  cfg.ReadTimeout,
		WriteTimeout: cfg.WriteTimeout,
		IdleTimeout:  cfg.IdleTimeout,
	}

	log.Printf("ejischool api listening on %s", cfg.HTTPAddr)
	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatalf("api server failed: %v", err)
	}
}
