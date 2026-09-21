// errors.js -- a small typed error so the Express error handler can map
// failures to the right HTTP status and a client-safe message, without
// ever leaking internals (stack traces, SDK error bodies) to the browser.

export class AppError extends Error {
  constructor(status, code, message, cause) {
    super(message)
    this.name = 'AppError'
    this.status = status
    this.code = code
    if (cause) this.cause = cause
  }
}
