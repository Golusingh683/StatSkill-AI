import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  UploadCloud,
  FileText,
  Sparkles,
  X,
  PlayCircle,
  RefreshCcw,
  Library,
} from 'lucide-react'

import Card, { CardHeader } from '../components/ui/Card'
import Select from '../components/ui/Select'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'

import { generateMcqs } from '../services/aiService'
import { useAppData } from '../hooks/useAppData.jsx'
import { useToast } from '../hooks/useToast.jsx'

import { materials } from '../data/materials'
import { competencyList } from '../data/competencies'
import { resolveCompetencyId } from '../data/topicCompetencyMap'

// =========================================================
// OPTIONS
// =========================================================

const countOptions = [5, 10, 15].map((n) => ({
  value: String(n),
  label: `${n} questions`,
}))

const difficultyOptions = ['Mixed', 'Easy', 'Medium', 'Hard'].map(
  (d) => ({
    value: d,
    label: d,
  })
)

// =========================================================
// ONLY MATERIALS WITH REAL FILE
// =========================================================

const libraryMaterials = materials.filter(
  (material) => material.file
)

// =========================================================
// COMPETENCY NAME
// =========================================================

function competencyName(id) {
  return (
    competencyList.find(
      (competency) => competency.id === id
    )?.name || 'General'
  )
}

// =========================================================
// MATERIAL OPTIONS
// =========================================================

const materialOptions = [
  {
    value: '',
    label: 'Select a material…',
  },

  ...libraryMaterials.map((material) => ({
    value: material.id,
    label: `${material.title} — ${competencyName(
      material.competencyId
    )}`,
  })),
]

// =========================================================
// FETCH LIBRARY MATERIAL
// =========================================================

async function fetchMaterialAsFile(material) {
  const response = await fetch(material.file)

  if (!response.ok) {
    throw new Error(
      'Could not load this learning material. Please try again.'
    )
  }

  const blob = await response.blob()

  const fileName =
    material.file.split('/').pop() ||
    `${material.title}.pdf`

  return new File(
    [blob],
    fileName,
    {
      type:
        blob.type ||
        'application/pdf',
    }
  )
}

// =========================================================
// MAIN COMPONENT
// =========================================================

export default function QuizGenerator() {
  const navigate = useNavigate()

  const { setActiveQuiz } = useAppData()

  const { notify } = useToast()

  // =======================================================
  // SOURCE
  // =======================================================

  const [source, setSource] =
    useState('upload')

  // upload file
  const [file, setFile] =
    useState(null)

  // library material
  const [selectedMaterialId, setSelectedMaterialId] =
    useState('')

  // =======================================================
  // GENERATION SETTINGS
  // =======================================================

  const [questionCount, setQuestionCount] =
    useState('5')

  const [difficulty, setDifficulty] =
    useState('Mixed')

  // =======================================================
  // UI STATE
  // =======================================================

  const [generating, setGenerating] =
    useState(false)

  const [generated, setGenerated] =
    useState(null)

  const [dragOver, setDragOver] =
    useState(false)

  const inputRef =
    useRef(null)

  // =======================================================
  // ACCEPTED FILE TYPES
  // =======================================================

  const acceptedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ]

  // =======================================================
  // SELECTED MATERIAL
  // =======================================================

  const selectedMaterial =
    libraryMaterials.find(
      (material) =>
        material.id === selectedMaterialId
    ) || null

  // =======================================================
  // SOURCE NAME
  // =======================================================

  const sourceName =
    source === 'upload'
      ? file?.name
      : selectedMaterial?.title

  // =======================================================
  // HANDLE FILE
  // =======================================================

  const handleFile = (selectedFile) => {
    if (!selectedFile) {
      return
    }

    const isAccepted =
      acceptedTypes.includes(
        selectedFile.type
      ) ||
      /\.(pdf|docx)$/i.test(
        selectedFile.name
      )

    if (!isAccepted) {
      notify(
        'Please upload a PDF or DOCX file.',
        {
          type: 'error',
        }
      )

      return
    }

    // Optional 20MB limit
    if (
      selectedFile.size >
      20 * 1024 * 1024
    ) {
      notify(
        'File size must be less than 20MB.',
        {
          type: 'error',
        }
      )

      return
    }

    setFile(selectedFile)

    setGenerated(null)
  }

  // =======================================================
  // CHANGE SOURCE
  // =======================================================

  const handleSourceChange = (nextSource) => {
    if (nextSource === source) {
      return
    }

    setSource(nextSource)

    setGenerated(null)

    // Clear previous source
    if (nextSource === 'upload') {
      setSelectedMaterialId('')
    } else {
      setFile(null)
    }
  }

  // =======================================================
  // GENERATE MCQs
  // =======================================================

  const handleGenerate = async () => {
    if (source === 'upload' && !file) {
      notify(
        'Please upload a PDF or DOCX file first.',
        {
          type: 'error',
        }
      )

      return
    }

    if (
      source === 'material' &&
      !selectedMaterial
    ) {
      notify(
        'Please select a learning material first.',
        {
          type: 'error',
        }
      )

      return
    }

    setGenerating(true)

    try {
      let generateInput

      // ===================================================
      // FROM LEARNING MATERIAL
      // ===================================================

      if (source === 'material') {
        const materialFile =
          await fetchMaterialAsFile(
            selectedMaterial
          )

        generateInput = {
          file: materialFile,

          fileName:
            selectedMaterial.title,

          questionCount:
            Number(questionCount),

          difficulty,
        }
      }

      // ===================================================
      // FROM UPLOADED FILE
      // ===================================================

      else {
        generateInput = {
          file,

          fileName:
            file.name,

          questionCount:
            Number(questionCount),

          difficulty,
        }
      }

      // ===================================================
      // CALL AI
      // ===================================================

      const questions =
        await generateMcqs(
          generateInput
        )

      // ===================================================
      // VALIDATE RESULT
      // ===================================================

      if (
        !Array.isArray(questions) ||
        questions.length === 0
      ) {
        throw new Error(
          'AI did not generate any questions.'
        )
      }

      setGenerated(questions)

      notify(
        `Generated ${questions.length} MCQs successfully.`,
        {
          type: 'success',
        }
      )
    } catch (error) {
      console.error(
        'MCQ generation failed:',
        error
      )

      notify(
        error?.message ||
          'Could not generate questions from this document.',
        {
          type: 'error',
        }
      )
    } finally {
      setGenerating(false)
    }
  }

  // =======================================================
  // RESOLVE COMPETENCY FROM GENERATED QUESTIONS
  // =======================================================

  const resolveGeneratedCompetency = () => {
    if (
      !generated ||
      generated.length === 0
    ) {
      return null
    }

    // Try every generated question topic
    // until a competency is found.
    for (const question of generated) {
      if (!question?.topic) {
        continue
      }

      const competencyId =
        resolveCompetencyId(
          question.topic
        )

      if (competencyId) {
        return competencyId
      }
    }

    return null
  }

  // =======================================================
  // START QUIZ
  // =======================================================

  const handleStartQuiz = () => {
    if (
      !generated ||
      generated.length === 0
    ) {
      notify(
        'Generate questions before starting the quiz.',
        {
          type: 'error',
        }
      )

      return
    }

    // =====================================================
    // COMPETENCY
    // =====================================================

    const competencyId =
      source === 'material'
        ? selectedMaterial?.competencyId ||
          null
        : resolveGeneratedCompetency()

    // =====================================================
    // TOPIC
    // =====================================================

    const topic =
      source === 'material'
        ? competencyName(
            selectedMaterial?.competencyId
          )
        : generated
            .map(
              (question) =>
                question.topic
            )
            .filter(Boolean)
            .slice(0, 3)
            .join(', ') ||
          'General'

    // =====================================================
    // SAVE ACTIVE QUIZ
    // =====================================================

    setActiveQuiz({
      title: `Generated Quiz — ${sourceName}`,

      topic,

      questions: generated,

      competencyId,
    })

    // =====================================================
    // OPEN QUIZ
    // =====================================================

    navigate('/quiz/generated')
  }

  // =======================================================
  // CAN GENERATE
  // =======================================================

  const canGenerate =
    source === 'upload'
      ? Boolean(file)
      : Boolean(selectedMaterial)

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="space-y-6">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div>

        <div className="flex items-center gap-2">

          <Sparkles className="h-5 w-5 text-navy-600" />

          <h2 className="font-display text-xl font-semibold text-ink-900 sm:text-2xl">
            AI Quiz Generator
          </h2>

        </div>

        <p className="mt-1 text-sm text-ink-700/70">
          Upload a training document, or pick one
          from your learning materials, to generate
          MCQs that check comprehension.
        </p>

      </div>

      {/* =====================================================
          STEP 1
      ===================================================== */}

      <Card>

        <CardHeader
          title="1. Choose learning material"
          icon={UploadCloud}
        />

        {/* SOURCE TOGGLE */}

        <div className="mb-4 inline-flex rounded-md border border-navy-200 bg-navy-50 p-1 text-sm">

          {/* UPLOAD */}

          <button
            type="button"
            onClick={() =>
              handleSourceChange('upload')
            }
            className={`flex items-center gap-1.5 rounded px-3 py-1.5 font-medium transition-colors ${
              source === 'upload'
                ? 'bg-white text-navy-800 shadow-sm'
                : 'text-ink-700/60 hover:text-ink-900'
            }`}
          >

            <UploadCloud className="h-3.5 w-3.5" />

            Upload a file

          </button>

          {/* MATERIAL */}

          <button
            type="button"
            onClick={() =>
              handleSourceChange('material')
            }
            className={`flex items-center gap-1.5 rounded px-3 py-1.5 font-medium transition-colors ${
              source === 'material'
                ? 'bg-white text-navy-800 shadow-sm'
                : 'text-ink-700/60 hover:text-ink-900'
            }`}
          >

            <Library className="h-3.5 w-3.5" />

            From learning materials

          </button>

        </div>

        {/* ===================================================
            UPLOAD MODE
        =================================================== */}

        {source === 'upload' ? (

          !file ? (

            <div
              onDragOver={(event) => {
                event.preventDefault()
                setDragOver(true)
              }}
              onDragLeave={() =>
                setDragOver(false)
              }
              onDrop={(event) => {
                event.preventDefault()

                setDragOver(false)

                handleFile(
                  event.dataTransfer.files?.[0]
                )
              }}
              onClick={() =>
                inputRef.current?.click()
              }
              className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-12 text-center transition-colors ${
                dragOver
                  ? 'border-navy-500 bg-navy-50'
                  : 'border-navy-200 hover:border-navy-400'
              }`}
            >

              <UploadCloud className="mb-3 h-8 w-8 text-navy-500" />

              <p className="text-sm font-medium text-ink-900">
                Click to upload, or drag and drop
              </p>

              <p className="mt-1 text-xs text-ink-700/60">
                PDF or DOCX, up to 20MB
              </p>

              <input
                ref={inputRef}
                type="file"
                accept=".pdf,.docx"
                className="hidden"
                onChange={(event) =>
                  handleFile(
                    event.target.files?.[0]
                  )
                }
              />

            </div>

          ) : (

            <div className="flex items-center justify-between rounded-md border border-navy-200 bg-navy-50 px-4 py-3">

              <div className="flex items-center gap-3">

                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-navy-700">

                  <FileText className="h-4 w-4" />

                </span>

                <div>

                  <p className="text-sm font-medium text-ink-900">
                    {file.name}
                  </p>

                  <p className="text-xs text-ink-700/60">
                    {(file.size / 1024).toFixed(0)} KB
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={() => {
                  setFile(null)
                  setGenerated(null)
                }}
                className="rounded p-1.5 text-ink-700/60 hover:bg-white"
                aria-label="Remove file"
              >

                <X className="h-4 w-4" />

              </button>

            </div>
          )

        ) : (

          /* =================================================
             MATERIAL MODE
          ================================================= */

          !selectedMaterial ? (

            <Select
              label="Learning material"
              options={materialOptions}
              value={selectedMaterialId}
              onChange={(event) => {
                setSelectedMaterialId(
                  event.target.value
                )

                setGenerated(null)
              }}
            />

          ) : (

            <div className="flex items-center justify-between rounded-md border border-navy-200 bg-navy-50 px-4 py-3">

              <div className="flex items-center gap-3">

                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-navy-700">

                  <FileText className="h-4 w-4" />

                </span>

                <div>

                  <p className="text-sm font-medium text-ink-900">
                    {selectedMaterial.title}
                  </p>

                  <p className="text-xs text-ink-700/60">

                    {competencyName(
                      selectedMaterial.competencyId
                    )}

                    {' · '}

                    {selectedMaterial.type}

                    {' · '}

                    {selectedMaterial.pages} pages

                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedMaterialId('')
                  setGenerated(null)
                }}
                className="rounded p-1.5 text-ink-700/60 hover:bg-white"
                aria-label="Change material"
              >

                <X className="h-4 w-4" />

              </button>

            </div>

          )
        )}

      </Card>

      {/* =====================================================
          STEP 2
      ===================================================== */}

      <Card>

        <CardHeader
          title="2. Configure generation"
          icon={Sparkles}
        />

        <div className="grid gap-4 sm:grid-cols-2">

          <Select
            label="Number of questions"
            options={countOptions}
            value={questionCount}
            onChange={(event) =>
              setQuestionCount(
                event.target.value
              )
            }
          />

          <Select
            label="Difficulty"
            options={difficultyOptions}
            value={difficulty}
            onChange={(event) =>
              setDifficulty(
                event.target.value
              )
            }
          />

        </div>

        <Button
          className="mt-5"
          icon={Sparkles}
          loading={generating}
          disabled={!canGenerate}
          onClick={handleGenerate}
        >
          Generate MCQs
        </Button>

        {!canGenerate && (

          <p className="mt-2 text-xs text-ink-700/50">

            {source === 'upload'
              ? 'Upload a document first to enable generation.'
              : 'Select a learning material first to enable generation.'}

          </p>

        )}

      </Card>

      {/* =====================================================
          STEP 3 — GENERATED QUESTIONS
      ===================================================== */}

      {generated && (

        <Card>

          <CardHeader
            title="3. Generated questions"
            subtitle={`${generated.length} MCQs from ${sourceName}`}
            action={

              <Button
                size="sm"
                variant="ghost"
                icon={RefreshCcw}
                onClick={handleGenerate}
                loading={generating}
              >
                Regenerate
              </Button>

            }
          />

          <div className="space-y-4">

            {generated.map(
              (question, index) => (

                <div
                  key={
                    question.id ||
                    `question-${index}`
                  }
                  className="rounded-md border border-navy-100 p-4"
                >

                  {/* TOPIC + DIFFICULTY */}

                  <div className="mb-2 flex items-center gap-2">

                    {question.topic && (

                      <Badge tone="neutral">
                        {question.topic}
                      </Badge>

                    )}

                    {question.difficulty && (

                      <Badge
                        tone={
                          question.difficulty ===
                          'Easy'
                            ? 'strong'
                            : question.difficulty ===
                              'Hard'
                            ? 'weak'
                            : 'moderate'
                        }
                      >
                        {question.difficulty}
                      </Badge>

                    )}

                  </div>

                  {/* QUESTION */}

                  <p className="text-sm font-medium text-ink-900">

                    {index + 1}.{' '}

                    {question.question}

                  </p>

                  {/* OPTIONS */}

                  <ul className="mt-2 space-y-1 text-sm text-ink-700/80">

                    {question.options?.map(
                      (
                        option,
                        optionIndex
                      ) => (

                        <li
                          key={optionIndex}
                          className={
                            optionIndex ===
                            question.correctIndex
                              ? 'font-medium text-moss-600'
                              : ''
                          }
                        >

                          {String.fromCharCode(
                            65 + optionIndex
                          )}

                          .{' '}

                          {option}

                        </li>

                      )
                    )}

                  </ul>

                  {/* EXPLANATION */}

                  {question.explanation && (

                    <p className="mt-2 text-xs text-ink-700/60">

                      <span className="font-medium">
                        Explanation:
                      </span>{' '}

                      {question.explanation}

                    </p>

                  )}

                </div>

              )
            )}

          </div>

          {/* START QUIZ */}

          <Button
            className="mt-5 w-full"
            icon={PlayCircle}
            onClick={handleStartQuiz}
          >

            Take this quiz now

          </Button>

        </Card>

      )}

    </div>
  )
}