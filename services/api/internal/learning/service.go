package learning

type Tutorial struct {
	Slug        string   `json:"slug"`
	Title       string   `json:"title"`
	Language    string   `json:"language"`
	Level       string   `json:"level"`
	Description string   `json:"description"`
	Objectives  []string `json:"objectives"`
}

type Service struct {
	tutorials []Tutorial
}

func NewService() *Service {
	return &Service{
		tutorials: []Tutorial{
			{Slug: "html", Title: "HTML Tutorial", Language: "HTML", Level: "Beginner", Description: "Learn semantic document structure.", Objectives: []string{"Structure pages", "Use semantic tags", "Improve accessibility"}},
			{Slug: "css", Title: "CSS Tutorial", Language: "CSS", Level: "Beginner", Description: "Style responsive web pages.", Objectives: []string{"Use selectors", "Create layouts", "Design responsive UI"}},
			{Slug: "javascript", Title: "JavaScript Tutorial", Language: "JavaScript", Level: "Beginner", Description: "Add interactivity and logic.", Objectives: []string{"Write functions", "Handle events", "Work with data"}},
			{Slug: "react", Title: "React Tutorial", Language: "React", Level: "Intermediate", Description: "Build component-driven interfaces.", Objectives: []string{"Create components", "Manage state", "Compose screens"}},
			{Slug: "go", Title: "Go Tutorial", Language: "Go", Level: "Beginner", Description: "Build fast backend services.", Objectives: []string{"Write packages", "Build handlers", "Model services"}},
			{Slug: "python", Title: "Python Tutorial", Language: "Python", Level: "Beginner", Description: "Program with readable syntax.", Objectives: []string{"Use variables", "Write functions", "Practice projects"}},
		},
	}
}

func (s *Service) ListTutorials() []Tutorial {
	return append([]Tutorial(nil), s.tutorials...)
}

func (s *Service) GetTutorial(slug string) (Tutorial, bool) {
	for _, tutorial := range s.tutorials {
		if tutorial.Slug == slug {
			return tutorial, true
		}
	}
	return Tutorial{}, false
}
