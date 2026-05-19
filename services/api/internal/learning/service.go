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
			{Slug: "sql", Title: "SQL Tutorial", Language: "SQL", Level: "Beginner", Description: "Query and design relational data.", Objectives: []string{"Select data", "Join tables", "Design schemas"}},
			{Slug: "react", Title: "React Tutorial", Language: "React", Level: "Intermediate", Description: "Build component-driven interfaces.", Objectives: []string{"Create components", "Manage state", "Compose screens"}},
			{Slug: "go", Title: "Go Tutorial", Language: "Go", Level: "Beginner", Description: "Build fast backend services.", Objectives: []string{"Write packages", "Build handlers", "Model services"}},
			{Slug: "python", Title: "Python Tutorial", Language: "Python", Level: "Beginner", Description: "Program with readable syntax.", Objectives: []string{"Use variables", "Write functions", "Practice projects"}},
			{Slug: "java", Title: "Java Tutorial", Language: "Java", Level: "Beginner", Description: "Build class-based applications.", Objectives: []string{"Use classes", "Control flow", "Practice OOP"}},
			{Slug: "php", Title: "PHP Tutorial", Language: "PHP", Level: "Beginner", Description: "Build dynamic server-rendered web pages.", Objectives: []string{"Handle forms", "Use arrays", "Connect data"}},
			{Slug: "typescript", Title: "TypeScript Tutorial", Language: "TypeScript", Level: "Intermediate", Description: "Add types to JavaScript applications.", Objectives: []string{"Model types", "Use interfaces", "Refactor safely"}},
			{Slug: "nodejs", Title: "Node.js Tutorial", Language: "Node.js", Level: "Intermediate", Description: "Run JavaScript on the server.", Objectives: []string{"Create APIs", "Use modules", "Handle async code"}},
			{Slug: "cpp", Title: "C++ Tutorial", Language: "C++", Level: "Intermediate", Description: "Practice compiled programming foundations.", Objectives: []string{"Use functions", "Manage data", "Build programs"}},
			{Slug: "csharp", Title: "C# Tutorial", Language: "C#", Level: "Intermediate", Description: "Build .NET-style applications.", Objectives: []string{"Use classes", "Write methods", "Practice collections"}},
			{Slug: "mysql", Title: "MySQL Tutorial", Language: "MySQL", Level: "Beginner", Description: "Store, query, and organize relational data.", Objectives: []string{"Create tables", "Write joins", "Use indexes"}},
			{Slug: "postgresql", Title: "PostgreSQL Tutorial", Language: "PostgreSQL", Level: "Intermediate", Description: "Use production relational database features.", Objectives: []string{"Write SQL", "Use constraints", "Tune queries"}},
			{Slug: "mongodb", Title: "MongoDB Tutorial", Language: "MongoDB", Level: "Intermediate", Description: "Model document database workflows.", Objectives: []string{"Create documents", "Query data", "Design collections"}},
			{Slug: "ai", Title: "AI Tutorial", Language: "AI", Level: "Intermediate", Description: "Learn applied AI concepts and workflows.", Objectives: []string{"Use prompts", "Evaluate output", "Build workflows"}},
			{Slug: "data-science", Title: "Data Science Tutorial", Language: "Data Science", Level: "Intermediate", Description: "Analyze data and communicate findings.", Objectives: []string{"Clean data", "Analyze trends", "Present results"}},
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
