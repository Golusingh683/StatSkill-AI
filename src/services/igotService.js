// igotService.js

import { learningModules } from '../data/learningModules'

const IGOT_INTEGRATION_STATUS = 'mock' // 'mock' | 'connected'

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function getIntegrationStatus() {
  return IGOT_INTEGRATION_STATUS
}


export async function fetchCourseCatalogue(competencyIds = []) {
  await delay(500)
  const filtered = competencyIds.length
    ? learningModules.filter((m) => competencyIds.includes(m.competencyId))
    : learningModules
  return filtered.filter((m) => m.provider === 'iGOT Karmayogi')
}


export async function enrollInCourse(moduleId) {
  await delay(400)
  return {
    success: true,
    moduleId,
    enrollmentId: `mock-enroll-${moduleId}`,
    note: 'Simulated enrollment. Connect real iGOT credentials to enable live enrollment.',
  }
}
