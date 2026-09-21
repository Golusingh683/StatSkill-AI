// Core competency framework used across assessment, gap analysis,
// recommendations and progress tracking.

export const competencyList = [
  {
    id: "programming",
    name: "Programming",
    description:
      "Core programming concepts, problem solving, data structures and algorithms.",
  },

  {
    id: "web-development",
    name: "Web Development",
    description:
      "Frontend and backend development using modern web technologies.",
  },

  {
    id: "database",
    name: "Database Management",
    description: "SQL, NoSQL databases, CRUD operations and data modelling.",
  },

  {
    id: "data-analysis",
    name: "Data Analysis",
    description:
      "Data cleaning, exploration, handling missing values and extracting insights.",
  },

  {
    id: "statistics",
    name: "Statistics & Probability",
    description:
      "Probability, distributions, descriptive statistics and statistical inference.",
  },

  {
    id: "data-visualization",
    name: "Data Visualization",
    description:
      "Creating clear charts, dashboards and communicating data-driven insights.",
  },

  {
    id: "artificial-intelligence",
    name: "Artificial Intelligence",
    description:
      "AI, machine learning fundamentals and practical generative AI applications.",
  },
];

export function getCompetencyLevel(score) {
  if (score >= 75) return { label: "Strong", tone: "strong" };
  if (score >= 55) return { label: "Moderate", tone: "moderate" };
  return { label: "Needs attention", tone: "weak" };
}
