import { HttpError } from './HttpError'

export class InternalServerError extends HttpError {
  constructor (errors: string[] = []) {
    super('Internal server error', 500, errors)
  }
}
