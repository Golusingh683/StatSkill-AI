// Mock aggregate data for the Admin Dashboard. 

export const orgStats = {
  totalLearners: 1284,
  activeThisMonth: 742,
  averageCompetency: 64,
  avgQuizScore: 71,
}

export const commonGaps = [
  { skill: 'Sampling', percentOfLearners: 58 },
  { skill: 'Data Visualization', percentOfLearners: 46 },
  { skill: 'Survey Methodology', percentOfLearners: 34 },
  { skill: 'Data Quality', percentOfLearners: 21 },
  { skill: 'Statistical Methods', percentOfLearners: 15 },
]

export const regionActivity = [
  { region: 'Northern Region', learners: 312, avgCompetency: 61 },
  { region: 'Western Region', learners: 288, avgCompetency: 68 },
  { region: 'Southern Region', learners: 341, avgCompetency: 66 },
  { region: 'Eastern Region', learners: 210, avgCompetency: 59 },
  { region: 'North-Eastern Region', learners: 133, avgCompetency: 55 },
]

export const monthlyActiveUsers = [
  { month: 'Apr', active: 520 },
  { month: 'May', active: 588 },
  { month: 'Jun', active: 631 },
  { month: 'Jul', active: 664 },
  { month: 'Aug', active: 705 },
  { month: 'Sep', active: 742 },
]

export const learningCompletionOrg = {
  completedPercent: 42,
  inProgressPercent: 38,
  notStartedPercent: 20,
}
