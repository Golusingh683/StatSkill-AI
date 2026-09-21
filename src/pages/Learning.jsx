import React, { useEffect, useMemo, useState } from 'react'
import {
  GraduationCap,
  Clock,
  BarChart2,
  PlayCircle,
  CheckCircle2,
  FileText,
  Search,
  FolderOpen,
  Download,
  ExternalLink,
  Sparkles,
} from 'lucide-react'

import Card, { CardHeader } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import ProgressBar from '../components/ui/ProgressBar'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Select from '../components/ui/Select'
import Modal from '../components/ui/Modal'
import { SkeletonCard } from '../components/ui/Skeleton'
import EmptyState from '../components/ui/EmptyState'

import { useNavigate } from 'react-router-dom'

import { useAppData } from '../hooks/useAppData.jsx'
import { getRecommendations } from '../services/aiService'

import {
  learningModules as allModules,
  recommendationReason,
} from '../data/learningModules'

import { materials } from '../data/materials'
import { competencyList } from '../data/competencies'
import { formatMinutes, formatDate } from '../utils/format'


// =========================================================
// DIFFICULTY
// =========================================================

const difficultyTone = {
  Beginner: 'strong',
  Intermediate: 'moderate',
  Advanced: 'weak',
}


// =========================================================
// MATERIAL ICON
// =========================================================

const typeIcon = {
  PDF: FileText,
  DOCX: FileText,
}


// =========================================================
// REAL PDF FILES
// Files are inside: public/materials/
// =========================================================

const pdfFiles = {
  'AI Fundamentals':
    '/materials/ai-fundamentals.pdf',

  'C++ Programming Fundamentals':
    '/materials/cpp-fundamentals.pdf',

  'Data Visualization Guide':
    '/materials/data-visualization-guide.pdf',

  'Data Structures and Algorithms Notes':
    '/materials/dsa-notes.pdf',

  'Generative AI Guide':
    '/materials/generative-ai-guide.pdf',

  'Machine Learning Notes':
    '/materials/machine-learning-notes.pdf',

  'MongoDB Guide':
    '/materials/mongodb-guide.pdf',

  'Node.js and Express Guide':
    '/materials/node-express-guide.pdf',

  'Python Data Analysis':
    '/materials/python-data-analysis.pdf',

  'React Development Guide':
    '/materials/react-development-guide.pdf',

  'SQL Fundamentals':
    '/materials/sql-fundamentals.pdf',

  'Statistics Fundamentals':
    '/materials/statistics-fundamentals.pdf',
}


// =========================================================
// GET REAL PDF PATH
// =========================================================

const getPdfPath = (material) => {
  if (!material) {
    return null
  }

  // 1. Agar materials.js me file diya hai
  if (material.file) {
    return material.file
  }

  // 2. Agar materials.js me fileUrl diya hai
  if (material.fileUrl) {
    return material.fileUrl
  }

  // 3. Title ke according public/materials se PDF
  if (pdfFiles[material.title]) {
    return pdfFiles[material.title]
  }

  return null
}


// =========================================================
// MAIN COMPONENT
// =========================================================

export default function Learning() {

  const { assessment } = useAppData()

  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)

  const [recommended, setRecommended] = useState([])

  const [query, setQuery] = useState('')

  const [competencyFilter, setCompetencyFilter] =
    useState('all')

  const [selectedMaterial, setSelectedMaterial] =
    useState(null)


  // =======================================================
  // LOAD COURSE RECOMMENDATIONS
  // =======================================================

  useEffect(() => {
  let cancelled = false

  async function loadRecommendations() {
    try {
      setLoading(true)

      const skillScores = assessment.completed
        ? assessment.analysis?.skillScores || []
        : allModules.map((module) => ({
            id: module.competencyId,
            score: 65,
          }))

      const result = await getRecommendations(
        skillScores,
        allModules,
        assessment.role
      )

      if (!cancelled) {
        setRecommended(result)
      }
    } catch (error) {
      console.error(
        'Failed to load recommendations:',
        error
      )

      if (!cancelled) {
        setRecommended(allModules)
      }
    } finally {
      if (!cancelled) {
        setLoading(false)
      }
    }
  }

  loadRecommendations()

  return () => {
    cancelled = true
  }
}, [assessment])

  // =======================================================
  // COMPETENCY FILTER OPTIONS
  // =======================================================

  const filterOptions = [

    {
      value: 'all',
      label: 'All competencies',
    },

    ...competencyList.map((competency) => ({
      value: competency.id,
      label: competency.name,
    })),

  ]


  // =======================================================
  // COMPETENCY NAME
  // =======================================================

  const competencyName = (id) => {

    return (
      competencyList.find(
        (competency) => competency.id === id
      )?.name || 'General'
    )

  }


  // =======================================================
  // FILTER + SORT MATERIALS
  // REAL PDF FIRST
  // =======================================================

  const filteredMaterials = useMemo(() => {

    const search = query
      .toLowerCase()
      .trim()

    const filtered = materials.filter((material) => {

      const title =
        material.title?.toLowerCase() || ''

      const description =
        material.description?.toLowerCase() || ''

      const matchesSearch =
        !search ||
        title.includes(search) ||
        description.includes(search)

      const matchesCompetency =
        competencyFilter === 'all' ||
        material.competencyId === competencyFilter

      return (
        matchesSearch &&
        matchesCompetency
      )

    })


    // =====================================================
    // REAL PDF WALA MATERIAL SABSE PEHLE
    // =====================================================

    return filtered.sort((a, b) => {

      const aHasPdf = !!getPdfPath(a)

      const bHasPdf = !!getPdfPath(b)

      if (aHasPdf && !bHasPdf) {
        return -1
      }

      if (!aHasPdf && bHasPdf) {
        return 1
      }

      return 0
    })

  }, [query, competencyFilter])


  // =======================================================
  // RECOMMENDED MATERIALS
  // =======================================================

  const recommendedMaterials = useMemo(() => {

    if (!assessment?.completed) {
      return []
    }

    const gapIds =
      assessment.analysis?.gaps?.map(
        (gap) => gap.id
      ) || []

    if (gapIds.length === 0) {
      return []
    }

    return materials.filter((material) =>
      gapIds.includes(material.competencyId)
    )

  }, [assessment])


  // =======================================================
  // OPEN COURSE
  // =======================================================

  const handleStartCourse = (course) => {

    if (!course?.id) {
      console.error('Course ID missing')
      return
    }

    navigate(`/learning/${course.id}`)

  }


  // =======================================================
  // OPEN MATERIAL MODAL
  // =======================================================

  const handleOpenMaterial = (material) => {
    setSelectedMaterial(material)
  }


  // =======================================================
  // CLOSE MATERIAL MODAL
  // =======================================================

  const handleCloseMaterial = () => {
    setSelectedMaterial(null)
  }


  // =======================================================
  // DOWNLOAD REAL PDF
  // =======================================================

  const handleDownloadMaterial = async (material) => {

    const filePath = getPdfPath(material)

    if (!filePath) {

      alert(
        'Is material ki PDF abhi available nahi hai.'
      )

      return
    }

    try {

      console.log(
        'Downloading PDF:',
        filePath
      )


      // ===================================================
      // PDF FETCH KARO
      // ===================================================

      const response = await fetch(filePath)

      if (!response.ok) {

        throw new Error(
          `PDF not found: ${response.status}`
        )

      }


      const blob = await response.blob()


      // ===================================================
      // BLOB URL BANAO
      // ===================================================

      const blobUrl =
        window.URL.createObjectURL(blob)


      // ===================================================
      // DOWNLOAD LINK
      // ===================================================

      const link =
        document.createElement('a')

      link.href = blobUrl


      // Actual filename
      const fileName =
        filePath.split('/').pop() ||
        `${material.title}.pdf`

      link.download = fileName

      link.style.display = 'none'

      document.body.appendChild(link)

      link.click()

      document.body.removeChild(link)


      // ===================================================
      // MEMORY CLEAN
      // ===================================================

      setTimeout(() => {
        window.URL.revokeObjectURL(blobUrl)
      }, 1000)

    } catch (error) {

      console.error(
        'PDF download failed:',
        error
      )


      // ===================================================
      // FALLBACK DOWNLOAD
      // ===================================================

      try {

        const link =
          document.createElement('a')

        link.href = filePath

        link.download =
          filePath.split('/').pop() ||
          `${material.title}.pdf`

        document.body.appendChild(link)

        link.click()

        document.body.removeChild(link)

      } catch (fallbackError) {

        console.error(
          'Fallback download failed:',
          fallbackError
        )

        alert(
          'PDF download nahi ho pa raha. Check karo ki PDF public/materials folder me hai.'
        )

      }

    }

  }


  // =======================================================
  // OPEN PDF IN BROWSER
  // =======================================================

  const handleOpenPdf = (material) => {

    const filePath =
      getPdfPath(material)

    if (!filePath) {

      alert(
        'Is learning material ki PDF abhi available nahi hai.'
      )

      return
    }

    window.open(
      filePath,
      '_blank',
      'noopener,noreferrer'
    )

  }


  // =======================================================
  // PAGE
  // =======================================================

  return (

    <div className="space-y-6">


      {/* =====================================================
          HEADER
      ===================================================== */}

      <div>

        <div className="flex items-center gap-2">

          <Sparkles className="h-5 w-5 text-navy-600" />

          <h2 className="font-display text-xl font-semibold text-ink-900 sm:text-2xl">

            Personalized Learning

          </h2>

        </div>

        <p className="mt-1 text-sm text-ink-700/70">

          Courses and reading materials recommended according
          to your competency profile.

        </p>

      </div>


      {/* =====================================================
          AI RECOMMENDATIONS
      ===================================================== */}

      {assessment?.completed && (

        <Card className="border-navy-200 bg-navy-50/60">

          <CardHeader
            title="Recommended for Your Competency Gaps"
            subtitle="AI-prioritized learning resources based on your assessment."
            icon={Sparkles}
          />


          {assessment.analysis?.gaps?.length > 0 ? (

            <div className="space-y-4">


              {/* GAP BADGES */}

              <div className="flex flex-wrap gap-2">

                {assessment.analysis.gaps.map((gap) => (

                  <Badge
                    key={gap.id}
                    tone="weak"
                  >

                    {gap.name} · {gap.score}%

                  </Badge>

                ))}

              </div>


              {/* RECOMMENDED RESOURCES */}

              <div className="grid gap-4 md:grid-cols-2">


                {/* RECOMMENDED COURSES */}

                {recommended

                  .filter((course) =>
                    assessment.analysis.gaps.some(
                      (gap) =>
                        gap.id ===
                        course.competencyId
                    )
                  )

                  .slice(0, 4)

                  .map((course) => (

                    <div
                      key={`course-${course.id}`}
                      className="rounded-lg border border-navy-200 bg-white p-4"
                    >

                      <div className="flex items-start justify-between gap-2">

                        <Badge
                          tone={
                            difficultyTone[
                              course.difficulty
                            ] || 'neutral'
                          }
                        >

                          {course.difficulty}

                        </Badge>

                        <GraduationCap className="h-4 w-4 text-navy-500" />

                      </div>


                      <h3 className="mt-2 text-sm font-semibold text-ink-900">

                        {course.title}

                      </h3>


                      <p className="mt-1 text-xs text-ink-700/70">

                        {course.description}

                      </p>


                      <p className="mt-2 text-xs text-navy-700">

                        {recommendationReason(
                          course.gapScore
                        )}

                      </p>


                      <Button
                        size="sm"
                        icon={PlayCircle}
                        className="mt-3 w-full"
                        onClick={() =>
                          handleStartCourse(course)
                        }
                      >

                        Start course

                      </Button>

                    </div>

                  ))}


                {/* RECOMMENDED READING */}

                {recommendedMaterials
                  .slice(0, 4)
                  .map((material) => {

                    const Icon =
                      typeIcon[material.type] ||
                      FileText

                    const pdfPath =
                      getPdfPath(material)

                    return (

                      <div
                        key={`material-${material.id}`}
                        className="rounded-lg border border-navy-200 bg-white p-4"
                      >

                        <div className="flex items-start justify-between">

                          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-navy-50 text-navy-700">

                            <Icon className="h-4 w-4" />

                          </span>

                          <Badge tone="neutral">

                            {material.type}

                          </Badge>

                        </div>


                        <h3 className="mt-2 text-sm font-semibold text-ink-900">

                          {material.title}

                        </h3>


                        <p className="mt-1 text-xs text-ink-700/70">

                          {material.description}

                        </p>


                        <p className="mt-2 text-xs text-ink-700/50">

                          {competencyName(
                            material.competencyId
                          )}

                          {' · '}

                          {material.pages} pages

                        </p>


                        {pdfPath && (

                          <Badge
                            tone="strong"
                            className="mt-2"
                          >

                            PDF available

                          </Badge>

                        )}


                        <Button
                          size="sm"
                          variant="secondary"
                          className="mt-3 w-full"
                          onClick={() =>
                            handleOpenMaterial(
                              material
                            )
                          }
                        >

                          View reading material

                        </Button>

                      </div>

                    )

                  })}

              </div>

            </div>

          ) : (

            <p className="text-sm text-ink-700/70">

              No major competency gaps were identified.
              You can explore the learning catalogue below
              to strengthen your existing skills.

            </p>

          )}

        </Card>

      )}


      {/* =====================================================
          ALL COURSES
      ===================================================== */}

      <div>

        <div className="mb-4">

          <h3 className="font-display text-lg font-semibold text-ink-900">

            Courses

          </h3>

          <p className="text-sm text-ink-700/60">

            Structured courses and learning modules.

          </p>

        </div>


        {/* LOADING */}

        {loading ? (

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {Array.from({ length: 6 }).map(
              (_, index) => (
                <SkeletonCard key={index} />
              )
            )}

          </div>

        ) : recommended.length === 0 ? (

          <EmptyState
            icon={GraduationCap}
            title="No courses available"
            description="Check back soon for new learning content."
          />

        ) : (

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {recommended.map((module) => (

              <Card
                key={module.id}
                className="flex flex-col"
              >

                <div className="mb-2 flex items-start justify-between gap-2">

                  <Badge
                    tone={
                      difficultyTone[
                        module.difficulty
                      ] || 'neutral'
                    }
                  >

                    {module.difficulty}

                  </Badge>


                  {module.progress === 100 && (

                    <CheckCircle2 className="h-4 w-4 text-moss-500" />

                  )}

                </div>


                <h3 className="text-sm font-semibold leading-snug text-ink-900">

                  {module.title}

                </h3>


                <p className="mt-1 text-xs text-navy-600">

                  {competencyName(
                    module.competencyId
                  )}

                </p>


                <p className="mt-1.5 flex-1 text-xs leading-relaxed text-ink-700/70">

                  {module.description}

                </p>


                <div className="mt-3 flex items-center gap-3 text-xs text-ink-700/60">

                  <span className="flex items-center gap-1">

                    <Clock className="h-3.5 w-3.5" />

                    {formatMinutes(
                      module.durationMins
                    )}

                  </span>


                  <span className="flex items-center gap-1">

                    <BarChart2 className="h-3.5 w-3.5" />

                    {module.provider}

                  </span>

                </div>


                <p className="mt-3 rounded-md bg-navy-50 px-3 py-2 text-xs text-navy-700">

                  {recommendationReason(
                    module.gapScore
                  )}

                </p>


                <ProgressBar
                  value={module.progress || 0}
                  size="sm"
                  className="mt-3"
                />


                <Button
                  size="sm"
                  variant={
                    module.progress > 0
                      ? 'secondary'
                      : 'primary'
                  }
                  icon={PlayCircle}
                  className="mt-3 w-full"
                  onClick={() =>
                    handleStartCourse(module)
                  }
                >

                  {module.progress === 100
                    ? 'Review module'
                    : module.progress > 0
                    ? 'Continue learning'
                    : 'Start learning'}

                </Button>

              </Card>

            ))}

          </div>

        )}

      </div>


      {/* =====================================================
          READING MATERIALS
      ===================================================== */}

      <div>

        <div className="mb-4">

          <h3 className="font-display text-lg font-semibold text-ink-900">

            Reading Materials

          </h3>

          <p className="text-sm text-ink-700/60">

            Reference documents and guides related to your learning.

          </p>

        </div>


        {/* SEARCH + FILTER */}

        <div className="mb-4 flex flex-col gap-3 sm:flex-row">

          <Input
            icon={Search}
            placeholder="Search reading materials..."
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
            className="flex-1"
          />


          <Select
            options={filterOptions}
            value={competencyFilter}
            onChange={(e) =>
              setCompetencyFilter(
                e.target.value
              )
            }
            className="sm:w-56"
          />

        </div>


        {/* MATERIALS */}

        {filteredMaterials.length === 0 ? (

          <EmptyState
            icon={FolderOpen}
            title="No reading materials found"
            description="Try a different search term or competency filter."
          />

        ) : (

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {filteredMaterials.map((material) => {

              const Icon =
                typeIcon[material.type] ||
                FileText

              const pdfPath =
                getPdfPath(material)

              return (

                <Card
                  key={material.id}
                  className="flex flex-col"
                >

                  {/* ICON + TYPE */}

                  <div className="mb-2 flex items-start justify-between">

                    <span className="flex h-9 w-9 items-center justify-center rounded-md bg-navy-50 text-navy-700">

                      <Icon className="h-4 w-4" />

                    </span>


                    <Badge tone="neutral">

                      {material.type}

                    </Badge>

                  </div>


                  {/* TITLE */}

                  <h3 className="text-sm font-semibold leading-snug text-ink-900">

                    {material.title}

                  </h3>


                  {/* DESCRIPTION */}

                  <p className="mt-1.5 flex-1 text-xs leading-relaxed text-ink-700/70">

                    {material.description}

                  </p>


                  {/* INFO */}

                  <p className="mt-3 text-xs text-ink-700/50">

                    {competencyName(
                      material.competencyId
                    )}

                    {' · '}

                    {material.pages} pages

                    {' · '}

                    Updated{' '}

                    {formatDate(
                      material.updated
                    )}

                  </p>


                  {/* PDF STATUS */}

                  <div className="mt-2">

                    {pdfPath ? (

                      <Badge tone="strong">

                        PDF available

                      </Badge>

                    ) : (

                      <Badge tone="neutral">

                        PDF not uploaded

                      </Badge>

                    )}

                  </div>


                  {/* BUTTONS */}

                  <div className="mt-3 grid grid-cols-2 gap-2">

                    {/* VIEW DETAILS */}

                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() =>
                        handleOpenMaterial(
                          material
                        )
                      }
                    >

                      View details

                    </Button>


                    {/* DOWNLOAD */}

                    <Button
                      size="sm"
                      icon={Download}
                      disabled={!pdfPath}
                      onClick={() =>
                        handleDownloadMaterial(
                          material
                        )
                      }
                    >

                      Download

                    </Button>

                  </div>

                </Card>

              )

            })}

          </div>

        )}

      </div>


      {/* =====================================================
          MATERIAL MODAL
      ===================================================== */}

      <Modal
        open={!!selectedMaterial}
        onClose={
          handleCloseMaterial
        }
        title={
          selectedMaterial?.title
        }

        footer={

          <>

            {/* CLOSE */}

            <Button
              variant="secondary"
              onClick={
                handleCloseMaterial
              }
            >

              Close

            </Button>


            {/* OPEN PDF */}

            <Button
              variant="secondary"
              icon={ExternalLink}
              disabled={
                !selectedMaterial ||
                !getPdfPath(selectedMaterial)
              }
              onClick={() =>
                handleOpenPdf(
                  selectedMaterial
                )
              }
            >

              Open PDF

            </Button>


            {/* DOWNLOAD PDF */}

            <Button
              icon={Download}
              disabled={
                !selectedMaterial ||
                !getPdfPath(selectedMaterial)
              }
              onClick={() =>
                handleDownloadMaterial(
                  selectedMaterial
                )
              }
            >

              Download PDF

            </Button>

          </>

        }
      >

        {selectedMaterial && (

          <div className="space-y-4 text-sm text-ink-700">


            {/* DESCRIPTION */}

            <p>

              {selectedMaterial.description}

            </p>


            {/* PDF STATUS */}

            {getPdfPath(selectedMaterial) ? (

              <div className="rounded-lg border border-moss-200 bg-moss-50 p-4">

                <div className="flex items-center gap-2">

                  <CheckCircle2 className="h-5 w-5 text-moss-600" />

                  <div>

                    <p className="font-medium text-ink-900">

                      PDF available

                    </p>

                    <p className="text-xs text-ink-700/60">

                      PDF ready hai. Tum ise browser
                      me open ya directly download kar
                      sakte ho.

                    </p>

                  </div>

                </div>

              </div>

            ) : (

              <div className="rounded-lg border border-ink-200 bg-ink-50 p-4">

                <div className="flex items-center gap-2">

                  <FileText className="h-5 w-5 text-ink-700/50" />

                  <div>

                    <p className="font-medium text-ink-900">

                      PDF not available

                    </p>

                    <p className="text-xs text-ink-700/60">

                      Is material ka actual PDF abhi
                      upload nahi hua hai.

                    </p>

                  </div>

                </div>

              </div>

            )}


            {/* DETAILS */}

            <div className="grid grid-cols-2 gap-3 rounded-md bg-navy-50 p-3 text-xs">

              <div>

                <span className="text-ink-700/50">

                  Competency

                </span>

                <p className="font-medium text-ink-900">

                  {competencyName(
                    selectedMaterial.competencyId
                  )}

                </p>

              </div>


              <div>

                <span className="text-ink-700/50">

                  Format

                </span>

                <p className="font-medium text-ink-900">

                  {selectedMaterial.type}

                </p>

              </div>


              <div>

                <span className="text-ink-700/50">

                  Length

                </span>

                <p className="font-medium text-ink-900">

                  {selectedMaterial.pages} pages

                </p>

              </div>


              <div>

                <span className="text-ink-700/50">

                  Last updated

                </span>

                <p className="font-medium text-ink-900">

                  {formatDate(
                    selectedMaterial.updated
                  )}

                </p>

              </div>

            </div>


            {/* FILE PATH */}

            {getPdfPath(selectedMaterial) && (

              <div className="rounded-md bg-ink-50 p-3">

                <p className="text-[11px] text-ink-700/50">

                  PDF file

                </p>

                <p className="mt-1 break-all text-xs font-medium text-ink-900">

                  {getPdfPath(
                    selectedMaterial
                  )}

                </p>

              </div>

            )}

          </div>

        )}

      </Modal>

    </div>

  )

}