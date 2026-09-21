// ============================================================
// LEARNING MATERIALS
// ============================================================
// Real PDF files are stored inside:
// public/materials/
//
// If a material has a "file" path, the user can open/download it.
// If file is null, it is currently only a reference material.
// ============================================================

export const materials = [
  // ==========================================================
  // PROGRAMMING
  // ==========================================================

  {
    id: "mat-cpp-basics",
    title: "C++ Programming Fundamentals",
    competencyId: "programming",
    courseIds: ["course-cpp-fundamentals"],
    type: "PDF",
    pages: 48,
    updated: "2026-02-10",
    file: "/materials/cpp-fundamentals.pdf",
    description:
      "Complete reference covering C++ syntax, variables, data types, operators, conditions, loops and functions.",
  },

  {
    id: "mat-cpp-practice",
    title: "C++ Programming Practice Workbook",
    competencyId: "programming",
    courseIds: ["course-cpp-fundamentals"],
    type: "PDF",
    pages: 36,
    updated: "2026-02-18",
    file: null,
    description:
      "Practice problems covering basic programming concepts, loops, functions, arrays and problem solving.",
  },

  {
    id: "mat-dsa-notes",
    title: "Data Structures and Algorithms Notes",
    competencyId: "programming",
    courseIds: ["course-dsa"],
    type: "PDF",
    pages: 72,
    updated: "2026-01-28",
    file: "/materials/dsa-notes.pdf",
    description:
      "Reference notes covering arrays, strings, linked lists, stacks, queues, searching and sorting algorithms.",
  },

  {
    id: "mat-algorithm-practice",
    title: "Algorithms Problem Solving Guide",
    competencyId: "programming",
    courseIds: ["course-dsa"],
    type: "PDF",
    pages: 54,
    updated: "2026-02-05",
    file: null,
    description:
      "Problem-solving exercises with algorithmic thinking, complexity analysis and coding challenges.",
  },

  {
    id: "mat-oop-cpp",
    title: "Object-Oriented Programming with C++",
    competencyId: "programming",
    courseIds: ["course-oop-cpp"],
    type: "PDF",
    pages: 62,
    updated: "2026-02-01",
    file: null,
    description:
      "Practical guide to classes, objects, encapsulation, inheritance, polymorphism and abstraction in C++.",
  },

  // ==========================================================
  // WEB DEVELOPMENT
  // ==========================================================

  {
    id: "mat-html-css",
    title: "HTML5 and CSS3 Web Development Guide",
    competencyId: "web-development",
    courseIds: ["course-html-css"],
    type: "PDF",
    pages: 58,
    updated: "2026-02-12",
    file: null,
    description:
      "Reference guide covering semantic HTML, forms, CSS, Flexbox, Grid and responsive website design.",
  },

  {
    id: "mat-react-guide",
    title: "React Development Handbook",
    competencyId: "web-development",
    courseIds: ["course-react"],
    type: "PDF",
    pages: 76,
    updated: "2026-02-20",
    file: "/materials/react-development-guide.pdf",
    description:
      "Learn React components, JSX, props, state, hooks, routing and API integration through practical examples.",
  },

  {
    id: "mat-react-practice",
    title: "React Practice Projects",
    competencyId: "web-development",
    courseIds: ["course-react"],
    type: "DOCX",
    pages: 32,
    updated: "2026-02-15",
    file: null,
    description:
      "Hands-on React exercises for building reusable components, forms, API-driven pages and small applications.",
  },

  {
    id: "mat-node-express",
    title: "Node.js and Express.js Backend Guide",
    competencyId: "web-development",
    courseIds: ["course-fullstack"],
    type: "PDF",
    pages: 68,
    updated: "2026-02-22",
    file: "/materials/node-express-guide.pdf",
    description:
      "Introduction to Node.js, Express.js, middleware, routing, APIs and backend application architecture.",
  },

  {
    id: "mat-rest-api",
    title: "REST API Development and Authentication",
    competencyId: "web-development",
    courseIds: ["course-fullstack"],
    type: "PDF",
    pages: 44,
    updated: "2026-02-19",
    file: null,
    description:
      "Practical reference for REST APIs, HTTP methods, authentication, request handling and frontend integration.",
  },

  // ==========================================================
  // DATABASE
  // ==========================================================

  {
    id: "mat-sql-basics",
    title: "SQL Fundamentals and Query Guide",
    competencyId: "database",
    courseIds: ["course-sql"],
    type: "PDF",
    pages: 64,
    updated: "2026-02-08",
    file: "/materials/sql-fundamentals.pdf",
    description:
      "Learn SQL queries, filtering, sorting, aggregate functions, grouping and joins with practical examples.",
  },

  {
    id: "mat-sql-practice",
    title: "SQL Query Practice Workbook",
    competencyId: "database",
    courseIds: ["course-sql"],
    type: "DOCX",
    pages: 38,
    updated: "2026-02-16",
    file: null,
    description:
      "Practice SQL problems involving SELECT, WHERE, JOIN, GROUP BY, subqueries and database operations.",
  },

  {
    id: "mat-mongodb",
    title: "MongoDB and NoSQL Reference",
    competencyId: "database",
    courseIds: ["course-mongodb"],
    type: "PDF",
    pages: 56,
    updated: "2026-02-06",
    file: "/materials/mongodb-guide.pdf",
    description:
      "Guide to MongoDB collections, documents, CRUD operations, queries, indexes and data modelling.",
  },

  {
    id: "mat-database-design",
    title: "Database Design and Data Modelling",
    competencyId: "database",
    courseIds: ["course-database-design"],
    type: "PDF",
    pages: 70,
    updated: "2026-01-30",
    file: null,
    description:
      "Reference covering ER diagrams, relationships, normalization, keys, indexing and database architecture.",
  },

  // ==========================================================
  // DATA ANALYSIS
  // ==========================================================

  {
    id: "mat-python-analysis",
    title: "Python for Data Analysis",
    competencyId: "data-analysis",
    courseIds: ["course-python-data"],
    type: "PDF",
    pages: 82,
    updated: "2026-02-21",
    file: "/materials/python-data-analysis.pdf",
    description:
      "Learn NumPy, Pandas, DataFrames, filtering, transformation, grouping and practical data analysis workflows.",
  },

  {
    id: "mat-pandas",
    title: "Pandas Data Analysis Cookbook",
    competencyId: "data-analysis",
    courseIds: ["course-python-data"],
    type: "DOCX",
    pages: 46,
    updated: "2026-02-17",
    file: null,
    description:
      "Hands-on Pandas examples for cleaning, transforming, analysing and summarising real-world datasets.",
  },

  {
    id: "mat-eda",
    title: "Exploratory Data Analysis Guide",
    competencyId: "data-analysis",
    courseIds: ["course-eda"],
    type: "PDF",
    pages: 60,
    updated: "2026-02-03",
    file: null,
    description:
      "Learn descriptive statistics, distributions, correlation, outlier detection and pattern discovery.",
  },

  {
    id: "mat-data-cleaning",
    title: "Data Cleaning and Preprocessing Handbook",
    competencyId: "data-analysis",
    courseIds: ["course-data-cleaning"],
    type: "PDF",
    pages: 52,
    updated: "2026-02-14",
    file: null,
    description:
      "Practical procedures for identifying missing values, duplicates, inconsistent data and outliers.",
  },

  // ==========================================================
  // STATISTICS
  // ==========================================================

  {
    id: "mat-statistics",
    title: "Statistics Fundamentals",
    competencyId: "statistics",
    courseIds: ["course-statistics"],
    type: "PDF",
    pages: 74,
    updated: "2026-01-25",
    file: "/materials/statistics-fundamentals.pdf",
    description:
      "Foundation material covering descriptive statistics, population, samples, central tendency and dispersion.",
  },

  {
    id: "mat-probability",
    title: "Probability and Statistical Distributions",
    competencyId: "statistics",
    courseIds: ["course-statistics"],
    type: "PDF",
    pages: 58,
    updated: "2026-02-04",
    file: null,
    description:
      "Reference material covering probability concepts and common statistical probability distributions.",
  },

  {
    id: "mat-estimation",
    title: "Estimation Theory and Confidence Intervals",
    competencyId: "statistics",
    courseIds: ["course-inference"],
    type: "PDF",
    pages: 48,
    updated: "2026-01-31",
    file: null,
    description:
      "Core concepts in point estimation, interval estimation and confidence intervals with worked examples.",
  },

  {
    id: "mat-hypothesis",
    title: "Hypothesis Testing Reference",
    competencyId: "statistics",
    courseIds: ["course-inference"],
    type: "PDF",
    pages: 52,
    updated: "2026-02-07",
    file: null,
    description:
      "Practical guide to hypothesis testing, p-values, statistical errors and interpretation of results.",
  },

  {
    id: "mat-sampling",
    title: "Survey Sampling Methods Guide",
    competencyId: "statistics",
    courseIds: ["course-sampling"],
    type: "PDF",
    pages: 86,
    updated: "2026-01-22",
    file: null,
    description:
      "Reference covering simple random, systematic, stratified, cluster and multistage sampling methods.",
  },

  // ==========================================================
  // DATA VISUALIZATION
  // ==========================================================

  {
    id: "mat-dataviz-guide",
    title: "Data Visualization Fundamentals",
    competencyId: "data-visualization",
    courseIds: ["course-dataviz"],
    type: "PDF",
    pages: 46,
    updated: "2026-02-11",
    file: "/materials/data-visualization-guide.pdf",
    description:
      "Learn chart selection, visual hierarchy, labels, accessibility and techniques for communicating data clearly.",
  },

  {
    id: "mat-dashboard",
    title: "Dashboard Design and Data Storytelling",
    competencyId: "data-visualization",
    courseIds: ["course-dashboard"],
    type: "PDF",
    pages: 64,
    updated: "2026-02-13",
    file: null,
    description:
      "Guide to designing effective dashboards, KPIs, layouts, filters and visual stories.",
  },

  {
    id: "mat-powerbi",
    title: "Power BI Interactive Reporting Guide",
    competencyId: "data-visualization",
    courseIds: ["course-powerbi"],
    type: "PDF",
    pages: 78,
    updated: "2026-02-23",
    file: null,
    description:
      "Practical guide to importing data, transformation, visualizations, measures, filters and dashboards.",
  },

  // ==========================================================
  // ARTIFICIAL INTELLIGENCE
  // ==========================================================

  {
    id: "mat-ai-basics",
    title: "Artificial Intelligence Fundamentals",
    competencyId: "artificial-intelligence",
    courseIds: ["course-ai-fundamentals"],
    type: "PDF",
    pages: 70,
    updated: "2026-02-09",
    file: "/materials/ai-fundamentals.pdf",
    description:
      "Introduction to AI, machine learning, common AI applications and responsible AI principles.",
  },

  {
    id: "mat-machine-learning",
    title: "Machine Learning Fundamentals",
    competencyId: "artificial-intelligence",
    courseIds: ["course-ml"],
    type: "PDF",
    pages: 84,
    updated: "2026-02-20",
    file: "/materials/machine-learning-notes.pdf",
    description:
      "Reference covering machine learning workflows, training, testing, regression, classification and evaluation.",
  },

  {
    id: "mat-genai",
    title: "Generative AI Fundamentals",
    competencyId: "artificial-intelligence",
    courseIds: ["course-genai"],
    type: "PDF",
    pages: 62,
    updated: "2026-02-24",
    file: "/materials/generative-ai-guide.pdf",
    description:
      "Understand generative AI, large language models, AI capabilities, limitations and practical applications.",
  },

  {
    id: "mat-prompting",
    title: "Prompt Engineering and AI Workflows",
    competencyId: "artificial-intelligence",
    courseIds: ["course-genai"],
    type: "DOCX",
    pages: 34,
    updated: "2026-02-25",
    file: null,
    description:
      "Practical guide to writing structured prompts, evaluating AI responses and building AI-assisted workflows.",
  },
];
