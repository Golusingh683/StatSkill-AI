// Complete B.Tech-focused learning course catalogue.
// Each course contains chapters and learning resources.

export const learningModules = [
  {
    id: "mod-programming-1",
    title: "Programming Fundamentals with C++",
    competencyId: "programming",
    difficulty: "Beginner",
    durationMins: 90,
    format: "Self-paced course",
    provider: "StatSkill Learning",
    progress: 0,

    description:
      "Learn variables, conditions, loops, functions, arrays and basic problem-solving using C++.",

    chapters: [
      {
        id: "cpp-ch-1",
        title: "Introduction to C++",
        durationMins: 15,
        lessons: [
          "What is C++?",
          "Structure of a C++ program",
          "Compilation and execution",
        ],
      },
      {
        id: "cpp-ch-2",
        title: "Variables and Data Types",
        durationMins: 20,
        lessons: [
          "Variables and constants",
          "Primitive data types",
          "Input and output",
        ],
      },
      {
        id: "cpp-ch-3",
        title: "Conditions and Loops",
        durationMins: 25,
        lessons: [
          "if, else and else-if",
          "for and while loops",
          "Nested loops",
        ],
      },
      {
        id: "cpp-ch-4",
        title: "Functions and Arrays",
        durationMins: 30,
        lessons: ["Functions", "Arrays", "Basic problem solving"],
      },
    ],

    materials: [
      {
        title: "C++ Programming Fundamentals Notes",
        type: "PDF",
        description: "Complete beginner notes covering core C++ concepts.",
      },
      {
        title: "C++ Practice Problems",
        type: "PDF",
        description:
          "Practice problems for variables, loops, functions and arrays.",
      },
    ],
  },

  {
    id: "mod-webdev-1",
    title: "Modern Web Development with React",
    competencyId: "web-development",
    difficulty: "Intermediate",
    durationMins: 120,
    format: "Self-paced course",
    provider: "StatSkill Learning",
    progress: 0,

    description:
      "Build modern web interfaces using React, components, props, state, hooks and API integration.",

    chapters: [
      {
        id: "react-ch-1",
        title: "React Fundamentals",
        durationMins: 25,
        lessons: ["What is React?", "Components", "JSX"],
      },
      {
        id: "react-ch-2",
        title: "Props and State",
        durationMins: 30,
        lessons: ["Passing props", "Managing state", "Event handling"],
      },
      {
        id: "react-ch-3",
        title: "React Hooks",
        durationMins: 30,
        lessons: ["useState", "useEffect", "Custom hooks"],
      },
      {
        id: "react-ch-4",
        title: "API Integration",
        durationMins: 35,
        lessons: ["Fetching data", "REST APIs", "Handling loading and errors"],
      },
    ],

    materials: [
      {
        title: "React Fundamentals Guide",
        type: "PDF",
        description:
          "Reference guide covering React components, props, state and hooks.",
      },
      {
        title: "React API Integration Notes",
        type: "PDF",
        description:
          "Learn how frontend applications communicate with backend APIs.",
      },
    ],
  },

  {
    id: "mod-database-1",
    title: "Database Management with SQL and MongoDB",
    competencyId: "database",
    difficulty: "Intermediate",
    durationMins: 100,
    format: "Self-paced course",
    provider: "StatSkill Learning",
    progress: 0,

    description:
      "Understand relational and NoSQL databases, queries, collections, CRUD operations and data modelling.",

    chapters: [
      {
        id: "db-ch-1",
        title: "Database Fundamentals",
        durationMins: 20,
        lessons: [
          "What is a database?",
          "Tables and records",
          "Primary and foreign keys",
        ],
      },
      {
        id: "db-ch-2",
        title: "SQL Queries",
        durationMins: 30,
        lessons: [
          "SELECT queries",
          "WHERE and ORDER BY",
          "GROUP BY and aggregate functions",
        ],
      },
      {
        id: "db-ch-3",
        title: "CRUD Operations",
        durationMins: 20,
        lessons: ["Create", "Read", "Update", "Delete"],
      },
      {
        id: "db-ch-4",
        title: "MongoDB Fundamentals",
        durationMins: 30,
        lessons: [
          "Collections and documents",
          "MongoDB queries",
          "NoSQL data modelling",
        ],
      },
    ],

    materials: [
      {
        title: "SQL Quick Reference",
        type: "PDF",
        description: "Common SQL commands and query examples.",
      },
      {
        title: "MongoDB Fundamentals",
        type: "PDF",
        description:
          "Introduction to MongoDB collections, documents and CRUD operations.",
      },
    ],
  },

  {
    id: "mod-dataanalysis-1",
    title: "Data Analysis with Python",
    competencyId: "data-analysis",
    difficulty: "Intermediate",
    durationMins: 120,
    format: "Self-paced course",
    provider: "StatSkill Learning",
    progress: 0,

    description:
      "Learn data cleaning, exploratory analysis, handling missing values and extracting insights from datasets.",

    chapters: [
      {
        id: "python-data-ch-1",
        title: "Python for Data Analysis",
        durationMins: 25,
        lessons: [
          "Python basics for analysis",
          "Lists and dictionaries",
          "Working with datasets",
        ],
      },
      {
        id: "python-data-ch-2",
        title: "Data Cleaning",
        durationMins: 30,
        lessons: [
          "Missing values",
          "Duplicate records",
          "Data type conversion",
        ],
      },
      {
        id: "python-data-ch-3",
        title: "Exploratory Data Analysis",
        durationMins: 35,
        lessons: [
          "Understanding distributions",
          "Summary statistics",
          "Finding patterns",
        ],
      },
      {
        id: "python-data-ch-4",
        title: "Extracting Insights",
        durationMins: 30,
        lessons: [
          "Comparing variables",
          "Identifying trends",
          "Communicating findings",
        ],
      },
    ],

    materials: [
      {
        title: "Python Data Analysis Notes",
        type: "PDF",
        description: "Practical notes for analysing datasets with Python.",
      },
      {
        title: "Data Cleaning Checklist",
        type: "PDF",
        description: "Checklist for preparing datasets before analysis.",
      },
    ],
  },

  {
    id: "mod-statistics-1",
    title: "Statistics and Probability Fundamentals",
    competencyId: "statistics",
    difficulty: "Beginner",
    durationMins: 90,
    format: "Self-paced course",
    provider: "StatSkill Learning",
    progress: 0,

    description:
      "Build a strong foundation in probability, distributions, descriptive statistics and statistical inference.",

    chapters: [
      {
        id: "stats-ch-1",
        title: "Descriptive Statistics",
        durationMins: 25,
        lessons: [
          "Mean, median and mode",
          "Variance and standard deviation",
          "Measures of spread",
        ],
      },
      {
        id: "stats-ch-2",
        title: "Probability Fundamentals",
        durationMins: 20,
        lessons: [
          "Basic probability",
          "Conditional probability",
          "Independent events",
        ],
      },
      {
        id: "stats-ch-3",
        title: "Probability Distributions",
        durationMins: 20,
        lessons: [
          "Normal distribution",
          "Binomial distribution",
          "Expected value",
        ],
      },
      {
        id: "stats-ch-4",
        title: "Statistical Inference",
        durationMins: 25,
        lessons: [
          "Samples and populations",
          "Confidence intervals",
          "Hypothesis testing",
        ],
      },
    ],

    materials: [
      {
        title: "Statistics Fundamentals",
        type: "PDF",
        description: "Core statistics concepts with examples and formulas.",
      },
      {
        title: "Probability Practice Sheet",
        type: "PDF",
        description:
          "Practice questions covering fundamental probability concepts.",
      },
    ],
  },

  {
    id: "mod-dataviz-1",
    title: "Data Visualization and Dashboard Design",
    competencyId: "data-visualization",
    difficulty: "Intermediate",
    durationMins: 75,
    format: "Interactive module",
    provider: "StatSkill Learning",
    progress: 0,

    description:
      "Learn how to choose effective charts, communicate insights and create clear data-driven dashboards.",

    chapters: [
      {
        id: "viz-ch-1",
        title: "Visualization Fundamentals",
        durationMins: 20,
        lessons: [
          "Why visualization matters",
          "Choosing the right chart",
          "Common visualization mistakes",
        ],
      },
      {
        id: "viz-ch-2",
        title: "Charts and Graphs",
        durationMins: 20,
        lessons: ["Bar charts", "Line charts", "Scatter plots"],
      },
      {
        id: "viz-ch-3",
        title: "Dashboard Design",
        durationMins: 20,
        lessons: [
          "Dashboard structure",
          "Information hierarchy",
          "Interactive dashboards",
        ],
      },
      {
        id: "viz-ch-4",
        title: "Communicating Insights",
        durationMins: 15,
        lessons: [
          "Highlighting key findings",
          "Using annotations",
          "Presenting data clearly",
        ],
      },
    ],

    materials: [
      {
        title: "Data Visualization Guide",
        type: "PDF",
        description:
          "Guide to selecting charts and communicating data effectively.",
      },
      {
        title: "Dashboard Design Checklist",
        type: "PDF",
        description: "Practical checklist for designing useful dashboards.",
      },
    ],
  },

  {
    id: "mod-ai-1",
    title: "Artificial Intelligence and Generative AI Fundamentals",
    competencyId: "artificial-intelligence",
    difficulty: "Beginner",
    durationMins: 100,
    format: "Self-paced course",
    provider: "StatSkill Learning",
    progress: 0,

    description:
      "Understand AI fundamentals, machine learning concepts, generative AI and practical applications of AI tools.",

    chapters: [
      {
        id: "ai-ch-1",
        title: "Introduction to Artificial Intelligence",
        durationMins: 20,
        lessons: [
          "What is AI?",
          "AI applications",
          "AI vs traditional programming",
        ],
      },
      {
        id: "ai-ch-2",
        title: "Machine Learning Basics",
        durationMins: 25,
        lessons: [
          "Supervised learning",
          "Unsupervised learning",
          "Training and testing",
        ],
      },
      {
        id: "ai-ch-3",
        title: "Generative AI",
        durationMins: 30,
        lessons: [
          "What is Generative AI?",
          "Large language models",
          "Prompt fundamentals",
        ],
      },
      {
        id: "ai-ch-4",
        title: "Practical AI Applications",
        durationMins: 25,
        lessons: [
          "AI-assisted analysis",
          "Automating repetitive tasks",
          "Responsible use of AI",
        ],
      },
    ],

    materials: [
      {
        title: "Artificial Intelligence Fundamentals",
        type: "PDF",
        description:
          "Beginner-friendly introduction to AI and machine learning.",
      },
      {
        title: "Generative AI Quick Guide",
        type: "PDF",
        description:
          "Introduction to generative AI, LLMs and effective prompting.",
      },
    ],
  },
];

export function recommendationReason(gapScore = 60) {
  if (gapScore < 50) {
    return "High priority recommendation based on your assessment score.";
  }

  if (gapScore < 70) {
    return "Recommended to strengthen this competency.";
  }

  return "Optional refresher to maintain your existing strength.";
}
