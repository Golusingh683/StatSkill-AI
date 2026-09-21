// =========================================================
// ASSESSMENT QUESTIONS
// Questions are mapped to job roles + competencies.
//
// Scoring:
// Option 0 = 25
// Option 1 = 50
// Option 2 = 75
// Option 3 = 100
// =========================================================

export const assessmentQuestions = [
  // =======================================================
  // WEB DEVELOPER
  // =======================================================

  {
    id: "q-web-1",
    role: "web-developer",
    competencyId: "web-development",

    question: "How comfortable are you with HTML, CSS and JavaScript?",

    options: [
      "I have little or no knowledge",
      "I understand the basics",
      "I can build simple web pages",
      "I can build complete responsive interfaces",
    ],
  },

  {
    id: "q-web-2",
    role: "web-developer",
    competencyId: "web-development",

    question:
      "How comfortable are you with React and component-based development?",

    options: [
      "I have never used React",
      "I understand basic React concepts",
      "I can build small React applications",
      "I can build and structure complete React applications",
    ],
  },

  {
    id: "q-web-3",
    role: "web-developer",
    competencyId: "web-development",

    question:
      "How comfortable are you with APIs and connecting a frontend application to a backend?",

    options: [
      "I have never worked with APIs",
      "I understand what an API is",
      "I can use APIs in simple applications",
      "I can integrate and handle APIs confidently in complete applications",
    ],
  },

  {
    id: "q-web-4",
    role: "web-developer",
    competencyId: "programming",

    question:
      "How comfortable are you with JavaScript functions, arrays, objects and basic problem solving?",

    options: [
      "I am not familiar with these concepts",
      "I understand the basic concepts",
      "I can use them in small applications",
      "I can confidently solve complex problems using them",
    ],
  },

  {
    id: "q-web-5",
    role: "web-developer",
    competencyId: "database",

    question:
      "How comfortable are you with storing and retrieving application data from a database?",

    options: [
      "I have little or no knowledge",
      "I understand the basic idea",
      "I can perform basic database operations",
      "I can design and work with databases in applications",
    ],
  },

  // =======================================================
  // DATA ANALYST
  // =======================================================

  {
    id: "q-data-1",
    role: "data-analyst",
    competencyId: "data-analysis",

    question: "How comfortable are you with Python for data analysis?",

    options: [
      "I have little or no knowledge",
      "I understand basic Python",
      "I can perform basic data analysis",
      "I can independently analyze real-world datasets",
    ],
  },

  {
    id: "q-data-2",
    role: "data-analyst",
    competencyId: "data-analysis",

    question:
      "How comfortable are you with cleaning data and handling missing values?",

    options: [
      "I do not know how to handle them",
      "I understand the basic idea",
      "I can handle common cases",
      "I can confidently clean and prepare real datasets",
    ],
  },

  {
    id: "q-data-3",
    role: "data-analyst",
    competencyId: "database",

    question:
      "How comfortable are you with SQL queries and relational databases?",

    options: [
      "I have little or no knowledge",
      "I understand basic SQL",
      "I can write common SQL queries",
      "I can design and optimize database queries",
    ],
  },

  {
    id: "q-data-4",
    role: "data-analyst",
    competencyId: "statistics",

    question:
      "How comfortable are you with probability and basic statistical concepts?",

    options: [
      "I find these concepts difficult",
      "I understand some basic concepts",
      "I can solve standard problems",
      "I can confidently apply them to real problems",
    ],
  },

  {
    id: "q-data-5",
    role: "data-analyst",
    competencyId: "statistics",

    question:
      "How comfortable are you with mean, median, variance and standard deviation?",

    options: [
      "I am not familiar with them",
      "I know their definitions",
      "I can calculate and interpret them",
      "I can apply them to analyze datasets",
    ],
  },

  {
    id: "q-data-6",
    role: "data-analyst",
    competencyId: "data-visualization",

    question:
      "How comfortable are you with choosing the right chart for a dataset?",

    options: [
      "I am not sure which chart to use",
      "I know common chart types",
      "I can choose appropriate charts for basic cases",
      "I can design effective visualizations for different datasets",
    ],
  },

  {
    id: "q-data-7",
    role: "data-analyst",
    competencyId: "data-visualization",

    question:
      "How comfortable are you with creating dashboards and presenting insights?",

    options: [
      "I have never created a dashboard",
      "I understand basic dashboard concepts",
      "I can create simple dashboards",
      "I can design interactive dashboards and communicate insights effectively",
    ],
  },

  // =======================================================
  // SOFTWARE DEVELOPER
  // =======================================================

  {
    id: "q-software-1",
    role: "software-developer",
    competencyId: "programming",

    question: "How comfortable are you with variables, conditions and loops?",

    options: [
      "I am not familiar with them",
      "I understand the basics",
      "I can use them in small programs",
      "I can use them confidently in complex problems",
    ],
  },

  {
    id: "q-software-2",
    role: "software-developer",
    competencyId: "programming",

    question:
      "How comfortable are you with functions, arrays and object-oriented programming?",

    options: [
      "I need to learn these from scratch",
      "I understand the basic concepts",
      "I can use them in small programs",
      "I can design and implement complex programs independently",
    ],
  },

  {
    id: "q-software-3",
    role: "software-developer",
    competencyId: "programming",

    question: "How comfortable are you with data structures and algorithms?",

    options: [
      "I have little or no knowledge",
      "I understand basic data structures",
      "I can solve standard algorithmic problems",
      "I can solve complex problems and choose efficient algorithms",
    ],
  },

  {
    id: "q-software-4",
    role: "software-developer",
    competencyId: "database",

    question: "How comfortable are you with databases and SQL?",

    options: [
      "I have little or no knowledge",
      "I understand basic database concepts",
      "I can write common SQL queries",
      "I can design databases and optimize queries",
    ],
  },

  {
    id: "q-software-5",
    role: "software-developer",
    competencyId: "web-development",

    question:
      "How comfortable are you with building applications using frontend or backend technologies?",

    options: [
      "I have little or no experience",
      "I understand basic application development",
      "I can build small applications",
      "I can structure and develop complete applications",
    ],
  },

  // =======================================================
  // AI / ML ENGINEER
  // =======================================================

  {
    id: "q-ai-1",
    role: "ai-ml-engineer",
    competencyId: "artificial-intelligence",

    question:
      "How familiar are you with artificial intelligence and machine learning concepts?",

    options: [
      "I have little or no knowledge",
      "I understand basic concepts",
      "I can explain common ML concepts",
      "I can apply ML concepts to practical problems",
    ],
  },

  {
    id: "q-ai-2",
    role: "ai-ml-engineer",
    competencyId: "data-analysis",

    question:
      "How comfortable are you with Python for machine learning and data analysis?",

    options: [
      "I have little or no knowledge",
      "I understand basic Python",
      "I can use Python for basic data tasks",
      "I can independently use Python for ML and data analysis",
    ],
  },

  {
    id: "q-ai-3",
    role: "ai-ml-engineer",
    competencyId: "statistics",

    question:
      "How comfortable are you with probability, statistics and mathematical concepts used in ML?",

    options: [
      "I find these concepts difficult",
      "I understand some basic concepts",
      "I can solve standard problems",
      "I can apply them confidently to machine learning problems",
    ],
  },

  {
    id: "q-ai-4",
    role: "ai-ml-engineer",
    competencyId: "artificial-intelligence",

    question:
      "How comfortable are you with training and evaluating machine learning models?",

    options: [
      "I have never worked with ML models",
      "I understand the basic workflow",
      "I can train simple models",
      "I can select, train and evaluate models for real problems",
    ],
  },

  {
    id: "q-ai-5",
    role: "ai-ml-engineer",
    competencyId: "artificial-intelligence",

    question:
      "How comfortable are you with Generative AI tools, prompting and AI workflows?",

    options: [
      "I rarely or never use them",
      "I have tried basic AI tools",
      "I can use AI tools effectively for common tasks",
      "I can design effective AI workflows and prompts",
    ],
  },

  // =======================================================
  // DATABASE DEVELOPER
  // =======================================================

  {
    id: "q-db-1",
    role: "database-developer",
    competencyId: "database",

    question: "How comfortable are you with SQL queries?",

    options: [
      "I have little or no knowledge",
      "I understand basic SQL",
      "I can write common SQL queries",
      "I can write complex and optimized SQL queries",
    ],
  },

  {
    id: "q-db-2",
    role: "database-developer",
    competencyId: "database",

    question:
      "How comfortable are you with database design, tables, relationships and normalization?",

    options: [
      "I am not familiar with these concepts",
      "I understand the basic concepts",
      "I can design simple database structures",
      "I can design normalized databases for complex applications",
    ],
  },

  {
    id: "q-db-3",
    role: "database-developer",
    competencyId: "database",

    question:
      "How comfortable are you with indexes, query optimization and database performance?",

    options: [
      "I have no knowledge of these concepts",
      "I understand the basic idea",
      "I can use basic indexes and optimization techniques",
      "I can analyze and optimize database performance",
    ],
  },

  {
    id: "q-db-4",
    role: "database-developer",
    competencyId: "database",

    question: "How comfortable are you with MongoDB and NoSQL concepts?",

    options: [
      "I have never used MongoDB",
      "I understand basic concepts",
      "I can perform basic CRUD operations",
      "I can design and work with MongoDB applications",
    ],
  },

  {
    id: "q-db-5",
    role: "database-developer",
    competencyId: "programming",

    question:
      "How comfortable are you with programming concepts needed to work with database applications?",

    options: [
      "I have little or no programming knowledge",
      "I understand basic programming concepts",
      "I can write simple database-related programs",
      "I can confidently build applications that interact with databases",
    ],
  },
];
