import { competencyList } from "./competencies";

const normalize = (value = "") =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const topicMap = {
  // Programming
  c: "programming",
  "c programming": "programming",
  cpp: "programming",
  "c++": "programming",
  "c++ programming": "programming",
  python: "programming",

  // Data
  sql: "data-management",
  dbms: "data-management",
  database: "data-management",
  "data analysis": "data-analysis",
  statistics: "statistics",

  // AI / ML
  ai: "artificial-intelligence",
  "artificial intelligence": "artificial-intelligence",
  ml: "machine-learning",
  "machine learning": "machine-learning",

  // Web
  react: "web-development",
  javascript: "web-development",
  html: "web-development",
  css: "web-development",

  // Cloud
  cloud: "cloud-computing",
  "cloud computing": "cloud-computing",

  // Cybersecurity
  cybersecurity: "cybersecurity",
  "cyber security": "cybersecurity",
};

// =========================================================
// RESOLVE ONE TOPIC -> COMPETENCY
// =========================================================

export function resolveCompetencyId(topic) {
  if (!topic) return null;

  const normalizedTopic = normalize(topic);

  // Direct map
  if (topicMap[normalizedTopic]) {
    return topicMap[normalizedTopic];
  }

  // Match competency names
  const competency = competencyList.find((item) => {
    const name = normalize(item.name);

    return (
      name === normalizedTopic ||
      normalizedTopic.includes(name) ||
      name.includes(normalizedTopic)
    );
  });

  if (competency) {
    return competency.id;
  }

  // Partial keyword matching
  const matchedCompetency = competencyList.find((item) => {
    const name = normalize(item.name);

    const words = name.split(" ");

    return words.some(
      (word) => word.length > 2 && normalizedTopic.includes(word),
    );
  });

  return matchedCompetency?.id || null;
}

// =========================================================
// RESOLVE QUIZ -> COMPETENCY
// =========================================================
//
// Quiz me multiple questions ho sakte hain.
// Hum questions ke topic ko check karke
// competency ID find karenge.
//

export function resolveQuizCompetencyId(questions) {
  if (!Array.isArray(questions)) {
    return null;
  }

  for (const question of questions) {
    if (!question) continue;

    const topic =
      question.topic ||
      question.category ||
      question.subject ||
      question.competency ||
      "";

    const competencyId = resolveCompetencyId(topic);

    if (competencyId) {
      return competencyId;
    }
  }

  return null;
}

export default resolveCompetencyId;
