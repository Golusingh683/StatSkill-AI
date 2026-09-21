// Mock historical progress used on the Dashboard and Progress Analytics
// pages. Represents monthly snapshots of overall competency and the
// quizzes taken in that period.

export const competencyHistory = [
  { month: 'Apr', overall: 48 },
  { month: 'May', overall: 52 },
  { month: 'Jun', overall: 55 },
  { month: 'Jul', overall: 59 },
  { month: 'Aug', overall: 63 },
  { month: 'Sep', overall: 66 },
]

export const skillProgressHistory = [
  { month: 'Apr', Sampling: 30, 'Data Visualization': 38, 'Data Analysis': 55, 'Data Quality': 60, 'Statistical Methods': 65 },
  { month: 'May', Sampling: 33, 'Data Visualization': 42, 'Data Analysis': 58, 'Data Quality': 63, 'Statistical Methods': 68 },
  { month: 'Jun', Sampling: 35, 'Data Visualization': 46, 'Data Analysis': 62, 'Data Quality': 67, 'Statistical Methods': 72 },
  { month: 'Jul', Sampling: 38, 'Data Visualization': 49, 'Data Analysis': 66, 'Data Quality': 71, 'Statistical Methods': 75 },
  { month: 'Aug', Sampling: 41, 'Data Visualization': 53, 'Data Analysis': 70, 'Data Quality': 75, 'Statistical Methods': 79 },
  { month: 'Sep', Sampling: 43, 'Data Visualization': 56, 'Data Analysis': 74, 'Data Quality': 78, 'Statistical Methods': 82 },
]

export const recentQuizScores = [
  { id: 'rq-1', title: 'Sampling Techniques Check', date: '2026-09-01', score: 6, total: 10, topic: 'Sampling' },
  { id: 'rq-2', title: 'Data Quality Fundamentals', date: '2026-08-24', score: 8, total: 10, topic: 'Data Quality' },
  { id: 'rq-3', title: 'Survey Methodology Basics', date: '2026-08-16', score: 7, total: 10, topic: 'Survey Methodology' },
  { id: 'rq-4', title: 'Data Visualization Principles', date: '2026-08-05', score: 5, total: 10, topic: 'Data Visualization' },
]

export const learningCompletion = {
  completedModules: 3,
  inProgressModules: 3,
  notStartedModules: 1,
  totalHoursSpent: 14.5,
}
