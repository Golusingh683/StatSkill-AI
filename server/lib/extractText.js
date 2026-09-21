// extractText.js
// -----------------------------------------------------------------------
// Extracts plain text from an uploaded PDF or DOCX file buffer.
// Throws an AppError (see errors.js) with a client-safe message for any
// unsupported type, corrupt file, or empty-after-extraction result.
// -----------------------------------------------------------------------

import mammoth from 'mammoth'
import { execFile } from 'node:child_process'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { AppError } from './errors.js'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const PDF_WORKER_PATH = join(__dirname, 'pdfWorker.js')

const SUPPORTED_MIME_TYPES = new Set([
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
])

// Keep prompts within a safe, predictable size for Gemini and to avoid
// runaway token costs on very large uploads. ~120k characters is roughly
// 30-40k tokens, comfortably inside Flash's context window while still
// being generous for a training document.
export const MAX_EXTRACTED_CHARS = 120000
export const MIN_EXTRACTED_CHARS = 80

function detectFileKind(file) {
  const name = (file.originalname || '').toLowerCase()
  if (file.mimetype === 'application/pdf' || name.endsWith('.pdf')) return 'pdf'
  if (
    file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    name.endsWith('.docx')
  ) {
    return 'docx'
  }
  return null
}

function extractPdfInWorker(buffer) {
  return new Promise((resolve, reject) => {
    let tmpDir
    mkdtemp(join(tmpdir(), 'statskill-pdf-'))
      .then((dir) => {
        tmpDir = dir
        const tmpFile = join(dir, 'upload.pdf')
        return writeFile(tmpFile, buffer).then(() => tmpFile)
      })
      .then((tmpFile) => {
        execFile(
          process.execPath,
          [PDF_WORKER_PATH, tmpFile],
          { timeout: 20000, maxBuffer: 10 * 1024 * 1024 },
          (error, stdout) => {
            rm(tmpDir, { recursive: true, force: true }).catch(() => {})

            let parsed
            try {
              parsed = JSON.parse(stdout || '{}')
            } catch {
              return reject(new Error('PDF worker returned an unreadable response.'))
            }

            if (error || parsed.error) {
              return reject(new Error(parsed.error || error.message))
            }
            resolve(parsed.text || '')
          }
        )
      })
      .catch(reject)
  })
}

export async function extractText(file) {
  if (!file) {
    throw new AppError(400, 'NO_FILE', 'No file was uploaded.')
  }

  const kind = detectFileKind(file)
  if (!kind) {
    throw new AppError(
      415,
      'UNSUPPORTED_FILE_TYPE',
      'Unsupported file type. Please upload a PDF or DOCX file.'
    )
  }

  let rawText = ''
  try {
    if (kind === 'pdf') {
      rawText = await extractPdfInWorker(file.buffer)
    } else {
      const result = await mammoth.extractRawText({ buffer: file.buffer })
      rawText = result.value || ''
    }
  } catch (err) {
    throw new AppError(
      422,
      'UNREADABLE_DOCUMENT',
      'The document could not be read. It may be corrupted, scanned as images only, or password protected.',
      err
    )
  }

  const cleaned = rawText.replace(/\s+/g, ' ').trim()

  if (cleaned.length < MIN_EXTRACTED_CHARS) {
    throw new AppError(
      422,
      'EMPTY_DOCUMENT',
      'This document does not contain enough readable text to generate questions from. If it is a scanned document, try uploading a text-based file instead.'
    )
  }

  const truncated = cleaned.length > MAX_EXTRACTED_CHARS
  const text = truncated ? cleaned.slice(0, MAX_EXTRACTED_CHARS) : cleaned

  return { text, truncated, originalLength: cleaned.length, kind }
}

export { SUPPORTED_MIME_TYPES }
