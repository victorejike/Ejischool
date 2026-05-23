package config

import (
	"errors"
	"os"
	"strings"
	"time"
)

type Config struct {
	Environment     string
	HTTPAddr        string
	JWTIssuer       string
	JWTSecret       string
	AdminSignupCode string
	DatabaseURL     string
	AllowedOrigins  []string
	ReadTimeout     time.Duration
	WriteTimeout    time.Duration
	IdleTimeout     time.Duration
}

func FromEnv() Config {
	return Config{
		Environment:     getEnv("APP_ENV", "development"),
		HTTPAddr:        httpAddrFromEnv(),
		JWTIssuer:       getEnv("JWT_ISSUER", "ejischool-api"),
		JWTSecret:       getEnv("JWT_SECRET", "dev-only-change-me"),
		AdminSignupCode: getEnv("ADMIN_SIGNUP_CODE", ""),
		DatabaseURL:     getEnv("DATABASE_URL", ""),
		AllowedOrigins:  splitCSV(getEnv("ALLOWED_ORIGINS", "http://localhost:3000")),
		ReadTimeout:     10 * time.Second,
		WriteTimeout:    10 * time.Second,
		IdleTimeout:     60 * time.Second,
	}
}

func (c Config) Validate() error {
	if strings.EqualFold(c.Environment, "production") {
		if c.DatabaseURL == "" {
			return errors.New("DATABASE_URL is required in production")
		}
		if c.JWTSecret == "" || c.JWTSecret == "dev-only-change-me" {
			return errors.New("JWT_SECRET must be set to a strong secret in production")
		}
		if len(c.AllowedOrigins) == 0 || contains(c.AllowedOrigins, "*") {
			return errors.New("ALLOWED_ORIGINS must list explicit origins in production")
		}
	}
	return nil
}

func getEnv(key string, fallback string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return fallback
}

func httpAddrFromEnv() string {
	if value := os.Getenv("HTTP_ADDR"); value != "" {
		return value
	}
	if port := os.Getenv("PORT"); port != "" {
		return "0.0.0.0:" + port
	}
	return ":8080"
}

func splitCSV(value string) []string {
	var items []string
	for _, item := range strings.Split(value, ",") {
		item = strings.TrimSpace(item)
		if item != "" {
			items = append(items, item)
		}
	}
	return items
}

func contains(items []string, needle string) bool {
	for _, item := range items {
		if item == needle {
			return true
		}
	}
	return false
}
