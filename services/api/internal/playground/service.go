package playground

import (
	"context"
	"errors"
	"strings"
	"time"
)

type RunRequest struct {
	Language string `json:"language"`
	Code     string `json:"code"`
}

type RunResult struct {
	Language   string        `json:"language"`
	Output     string        `json:"output"`
	Duration   time.Duration `json:"duration"`
	Sandboxed  bool          `json:"sandboxed"`
	Executable bool          `json:"executable"`
}

type Service struct{}

func NewService() *Service {
	return &Service{}
}

func (s *Service) Run(ctx context.Context, req RunRequest) (RunResult, error) {
	start := time.Now()
	language := strings.ToLower(strings.TrimSpace(req.Language))
	if language == "" {
		return RunResult{}, errors.New("language is required")
	}
	if strings.TrimSpace(req.Code) == "" {
		return RunResult{}, errors.New("code is required")
	}
	if len(req.Code) > 10000 {
		return RunResult{}, errors.New("code exceeds playground limit")
	}

	select {
	case <-ctx.Done():
		return RunResult{}, ctx.Err()
	default:
	}

	return RunResult{
		Language:   language,
		Output:     "Execution request accepted. Connect this service to the isolated compiler workers for real execution.",
		Duration:   time.Since(start),
		Sandboxed:  true,
		Executable: false,
	}, nil
}
