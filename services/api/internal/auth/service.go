package auth

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"strings"
	"time"
)

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type SignupRequest struct {
	Name      string `json:"name"`
	Email     string `json:"email"`
	Password  string `json:"password"`
	Role      string `json:"role"`
	AdminCode string `json:"adminCode"`
}

type Session struct {
	UserID       string    `json:"userId"`
	Email        string    `json:"email"`
	Role         string    `json:"role"`
	AccessToken  string    `json:"accessToken"`
	RefreshToken string    `json:"refreshToken"`
	ExpiresAt    time.Time `json:"expiresAt"`
	TokenType    string    `json:"tokenType"`
}

type Service struct {
	issuer string
	secret []byte
}

type Claims struct {
	Subject   string `json:"sub"`
	Email     string `json:"email"`
	Role      string `json:"role"`
	Issuer    string `json:"iss"`
	TokenType string `json:"typ"`
	ExpiresAt int64  `json:"exp"`
	IssuedAt  int64  `json:"iat"`
}

func NewService(issuer string, secret string) *Service {
	return &Service{issuer: issuer, secret: []byte(secret)}
}

func (s *Service) Login(req LoginRequest, role string) (Session, error) {
	email := strings.TrimSpace(strings.ToLower(req.Email))
	if email == "" || req.Password == "" {
		return Session{}, errors.New("email and password are required")
	}
	if !strings.Contains(email, "@") {
		return Session{}, errors.New("email must be valid")
	}
	if role == "" {
		role = "learner"
	}

	expiresAt := time.Now().UTC().Add(30 * time.Minute)
	userID := s.userID(email)
	accessToken, err := s.token("access", userID, email, role, expiresAt)
	if err != nil {
		return Session{}, err
	}
	refreshToken, err := s.token("refresh", userID, email, role, time.Now().UTC().Add(30*24*time.Hour))
	if err != nil {
		return Session{}, err
	}

	return Session{
		UserID:       userID,
		Email:        email,
		Role:         role,
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
		ExpiresAt:    expiresAt,
		TokenType:    "Bearer",
	}, nil
}

func (s *Service) Validate(token string) (Claims, error) {
	parts := strings.Split(token, ".")
	if len(parts) != 3 {
		return Claims{}, errors.New("invalid token")
	}
	unsigned := parts[0] + "." + parts[1]
	expected := s.sign(unsigned)
	if !hmac.Equal([]byte(expected), []byte(parts[2])) {
		return Claims{}, errors.New("invalid token signature")
	}
	payload, err := base64.RawURLEncoding.DecodeString(parts[1])
	if err != nil {
		return Claims{}, errors.New("invalid token payload")
	}
	var claims Claims
	if err := json.Unmarshal(payload, &claims); err != nil {
		return Claims{}, errors.New("invalid token claims")
	}
	if claims.Issuer != s.issuer || claims.TokenType != "access" || claims.ExpiresAt <= time.Now().Unix() {
		return Claims{}, errors.New("token expired or not accepted")
	}
	return claims, nil
}

func (s *Service) token(kind string, userID string, email string, role string, expiresAt time.Time) (string, error) {
	header, err := json.Marshal(map[string]string{"alg": "HS256", "typ": "JWT"})
	if err != nil {
		return "", err
	}
	now := time.Now().UTC()
	payload, err := json.Marshal(Claims{
		Subject:   userID,
		Email:     email,
		Role:      role,
		Issuer:    s.issuer,
		TokenType: kind,
		ExpiresAt: expiresAt.Unix(),
		IssuedAt:  now.Unix(),
	})
	if err != nil {
		return "", err
	}
	unsigned := fmt.Sprintf("%s.%s", base64.RawURLEncoding.EncodeToString(header), base64.RawURLEncoding.EncodeToString(payload))
	return unsigned + "." + s.sign(unsigned), nil
}

func (s *Service) sign(value string) string {
	mac := hmac.New(sha256.New, s.secret)
	_, _ = mac.Write([]byte(value))
	return base64.RawURLEncoding.EncodeToString(mac.Sum(nil))
}

func (s *Service) userID(email string) string {
	sum := sha256.Sum256([]byte("user:" + email))
	return hex.EncodeToString(sum[:8])
}
