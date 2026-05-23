package database

import (
	"context"
	"database/sql"
	_ "embed"
	"errors"
	"time"

	_ "github.com/jackc/pgx/v5/stdlib"
)

//go:embed schema.sql
var schemaSQL string

func Open(ctx context.Context, databaseURL string) (*sql.DB, error) {
	if databaseURL == "" {
		return nil, nil
	}

	db, err := sql.Open("pgx", databaseURL)
	if err != nil {
		return nil, err
	}
	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(5)
	db.SetConnMaxLifetime(30 * time.Minute)

	pingCtx, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()
	if err := db.PingContext(pingCtx); err != nil {
		_ = db.Close()
		return nil, err
	}

	if _, err := db.ExecContext(pingCtx, schemaSQL); err != nil {
		_ = db.Close()
		return nil, err
	}

	return db, nil
}

func IsUnavailable(err error) bool {
	return errors.Is(err, sql.ErrNoRows)
}
