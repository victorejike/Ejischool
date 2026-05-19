package config

import (
	"os"
	"time"
)

type Config struct {
	Environment  string
	HTTPAddr     string
	JWTIssuer    string
	DatabaseURL  string
	ReadTimeout  time.Duration
	WriteTimeout time.Duration
	IdleTimeout  time.Duration
}

func FromEnv() Config {
	return Config{
		Environment:  getEnv("APP_ENV", "development"),
		HTTPAddr:     getEnv("HTTP_ADDR", ":8080"),
		JWTIssuer:    getEnv("JWT_ISSUER", "ejischool-api"),
		DatabaseURL:  getEnv("DATABASE_URL", ""),
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  60 * time.Second,
	}
}

func getEnv(key string, fallback string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return fallback
}
