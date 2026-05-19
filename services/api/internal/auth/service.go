package auth

import (
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"strings"
	"time"
)

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type SignupRequest struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Role     string `json:"role"`
}

type Session struct {
	UserID       string    `json:"userId"`
	Email        string    `json:"email"`
	AccessToken  string    `json:"accessToken"`
	RefreshToken string    `json:"refreshToken"`
	ExpiresAt    time.Time `json:"expiresAt"`
	TokenType    string    `json:"tokenType"`
}

type Service struct {
	issuer string
}

func NewService(issuer string) *Service {
	return &Service{issuer: issuer}
}

func (s *Service) Login(req LoginRequest) (Session, error) {
	email := strings.TrimSpace(strings.ToLower(req.Email))
	if email == "" || req.Password == "" {
		return Session{}, errors.New("email and password are required")
	}
	if !strings.Contains(email, "@") {
		return Session{}, errors.New("email must be valid")
	}

	expiresAt := time.Now().UTC().Add(30 * time.Minute)
	accessToken := s.token("access", email, expiresAt)
	refreshToken := s.token("refresh", email, time.Now().UTC().Add(30*24*time.Hour))

	return Session{
		UserID:       s.userID(email),
		Email:        email,
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
		ExpiresAt:    expiresAt,
		TokenType:    "Bearer",
	}, nil
}

func (s *Service) token(kind string, email string, expiresAt time.Time) string {
	sum := sha256.Sum256([]byte(kind + ":" + email + ":" + s.issuer + ":" + expiresAt.Format(time.RFC3339Nano)))
	return hex.EncodeToString(sum[:])
}

func (s *Service) userID(email string) string {
	sum := sha256.Sum256([]byte("user:" + email))
	return hex.EncodeToString(sum[:8])
}
