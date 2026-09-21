# StatSkill AI — Backend

Express backend for the AI Quiz Generator. Extracts text from an
uploaded PDF/DOCX and asks Gemini to generate MCQs from it. The Gemini
API key stays server-side only — it is never sent to or readable by
the browser.

## Setup

```bash
cd server
npm install
cp .env.example .env
# edit .env and set GEMINI_API_KEY=your_real_key
npm run dev
```

The server listens on `http://localhost:3001` (override with `PORT` in
`.env`). The frontend's Vite dev server proxies `/api/*` requests to it
automatically (see `vite.config.js`), so no CORS setup is needed in dev.

## Endpoints

- `GET /api/health` — returns `{ status, geminiConfigured, model }`.
- `POST /api/generate-mcqs` — `multipart/form-data` with fields:
  - `file` — a PDF or DOCX file (required)
  - `questionCount` — 1-20 (default 5)
  - `difficulty` — `Mixed` | `Easy` | `Medium` | `Hard` (default `Mixed`)

  Returns `{ questions: [...], meta: { sourceFile, truncated, model } }`
  on success. On failure, returns a JSON error body
  `{ error: CODE, message }` with an appropriate HTTP status:

  | Status | Code                  | Meaning                                   |
  |-------:|-----------------------|--------------------------------------------|
  |    400 | `NO_FILE`              | No file was included in the request       |
  |    413 | `DOCUMENT_TOO_LARGE`   | File exceeds the 20MB upload limit        |
  |    415 | `UNSUPPORTED_FILE_TYPE`| Not a PDF or DOCX file                    |
  |    422 | `EMPTY_DOCUMENT`       | Not enough readable text was extracted    |
  |    422 | `UNREADABLE_DOCUMENT`  | File is corrupted / scanned images only   |
  |    500 | `MISSING_API_KEY`      | `GEMINI_API_KEY` isn't configured         |
  |    502 | `GEMINI_API_ERROR`     | The Gemini API call itself failed         |
  |    502 | `INVALID_AI_RESPONSE`  | Gemini's response didn't match the required MCQ schema |

## Architecture notes

- **PDF extraction runs in an isolated child process** (`lib/pdfWorker.js`,
  using `pdfjs-dist`). This was a deliberate fix: loading `@google/genai`
  and a PDF parser in the same process caused pdf-parse's old bundled
  pdf.js to fail unpredictably. Running PDF parsing in its own process
  also means a malformed PDF can never crash the main server.
- **DOCX extraction** uses `mammoth` in-process (no such conflict there).
- **Very large documents** are truncated to ~120k characters before
  being sent to Gemini (see `MAX_EXTRACTED_CHARS` in `lib/extractText.js`)
  to keep prompts within a safe size; the response includes
  `meta.truncated: true` when this happens.
- **Gemini's output is never trusted as-is** — `lib/validateMcqs.js`
  checks every field's type and shape before the response is sent to
  the frontend, and rejects the whole batch with `INVALID_AI_RESPONSE`
  if anything doesn't match.
