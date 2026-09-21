#!/usr/bin/env node
// pdfWorker.js
// -----------------------------------------------------------------------
// Standalone entry point that extracts text from a single PDF file,
// using pdfjs-dist (Mozilla's actively-maintained PDF engine) directly
// rather than the unmaintained `pdf-parse` wrapper, which bundles a very
// old pdf.js build that fails on PDFs using modern cross-reference
// streams (common output from many real-world PDF generators).
//
// Runs in its own child process (see extractText.js) so a malformed or
// unusual PDF, or any global-state side effect from another dependency
// loaded into the main server process, can never affect or crash the
// main server.
//
// Usage: node pdfWorker.js <path-to-pdf>
// Prints a single JSON line to stdout: {"text": "..."} on success,
// or {"error": "..."} (with a non-zero exit code) on failure.
// -----------------------------------------------------------------------

import { readFile } from 'node:fs/promises'
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs'

async function extractPdfText(buffer) {
  const loadingTask = pdfjsLib.getDocument({
    data: new Uint8Array(buffer),
    useSystemFonts: true,
    isEvalSupported: false,
  })
  const doc = await loadingTask.promise

  const pageTexts = []
  for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
    const page = await doc.getPage(pageNum)
    const content = await page.getTextContent()
    const pageText = content.items.map((item) => item.str).join(' ')
    pageTexts.push(pageText)
  }
  return pageTexts.join('\n')
}

async function main() {
  const filePath = process.argv[2]
  if (!filePath) {
    process.stdout.write(JSON.stringify({ error: 'No file path provided.' }))
    process.exit(1)
  }

  try {
    const buffer = await readFile(filePath)
    const text = await extractPdfText(buffer)
    process.stdout.write(JSON.stringify({ text }))
  } catch (err) {
    process.stdout.write(JSON.stringify({ error: err.message || 'Failed to parse PDF.' }))
    process.exit(1)
  }
}

main()
