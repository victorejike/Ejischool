package learning

import (
	"context"
	"database/sql"
	"errors"
)

type CourseRecord struct {
	ID          string `json:"id,omitempty"`
	Slug        string `json:"slug"`
	Title       string `json:"title"`
	Language    string `json:"language"`
	Level       string `json:"level"`
	Description string `json:"description"`
}

type ExerciseSubmissionRequest struct {
	CourseSlug string `json:"courseSlug"`
	UserID     string `json:"userId"`
	Code       string `json:"code"`
}

type ExerciseSubmissionResult struct {
	Status string  `json:"status"`
	Score  float64 `json:"score"`
	Hint   string  `json:"hint"`
}

func SeedCourses(ctx context.Context, db *sql.DB, courses []CourseRecord) error {
	if db == nil {
		return nil
	}
	for _, course := range courses {
		if _, err := db.ExecContext(ctx, `
			INSERT INTO courses (slug, title, description, level)
			VALUES ($1, $2, $3, $4)
			ON CONFLICT (slug) DO UPDATE
			SET title = EXCLUDED.title,
			    description = EXCLUDED.description,
			    level = EXCLUDED.level
		`, course.Slug, course.Title, course.Description, course.Level); err != nil {
			return err
		}
	}
	return nil
}

func ListCourses(ctx context.Context, db *sql.DB) ([]CourseRecord, error) {
	rows, err := db.QueryContext(ctx, `SELECT id::text, slug, title, level, description FROM courses ORDER BY title`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var courses []CourseRecord
	for rows.Next() {
		var course CourseRecord
		if err := rows.Scan(&course.ID, &course.Slug, &course.Title, &course.Level, &course.Description); err != nil {
			return nil, err
		}
		course.Language = courseTitleToLanguage(course.Title)
		courses = append(courses, course)
	}
	return courses, rows.Err()
}

func GetCourse(ctx context.Context, db *sql.DB, slug string) (CourseRecord, error) {
	var course CourseRecord
	err := db.QueryRowContext(ctx, `SELECT id::text, slug, title, level, description FROM courses WHERE slug = $1`, slug).Scan(&course.ID, &course.Slug, &course.Title, &course.Level, &course.Description)
	if err != nil {
		return CourseRecord{}, err
	}
	course.Language = courseTitleToLanguage(course.Title)
	return course, nil
}

func UpdateCourse(ctx context.Context, db *sql.DB, slug string, course CourseRecord) (CourseRecord, error) {
	if course.Title == "" || course.Description == "" || course.Level == "" {
		return CourseRecord{}, errors.New("title, description, and level are required")
	}
	err := db.QueryRowContext(ctx, `
		UPDATE courses
		SET title = $2, description = $3, level = $4
		WHERE slug = $1
		RETURNING id::text, slug, title, level, description
	`, slug, course.Title, course.Description, course.Level).Scan(&course.ID, &course.Slug, &course.Title, &course.Level, &course.Description)
	if err != nil {
		return CourseRecord{}, err
	}
	course.Language = courseTitleToLanguage(course.Title)
	return course, nil
}

func DefaultCourses(tutorials []Tutorial) []CourseRecord {
	courses := make([]CourseRecord, 0, len(tutorials))
	for _, tutorial := range tutorials {
		courses = append(courses, CourseRecord{
			Slug:        tutorial.Slug,
			Title:       tutorial.Title,
			Language:    tutorial.Language,
			Level:       tutorial.Level,
			Description: tutorial.Description,
		})
	}
	return courses
}

func courseTitleToLanguage(title string) string {
	const suffix = " Tutorial"
	if len(title) > len(suffix) && title[len(title)-len(suffix):] == suffix {
		return title[:len(title)-len(suffix)]
	}
	return title
}
