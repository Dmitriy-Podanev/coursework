import { HttpError } from './HttpError'

export class UnauthorizedError extends HttpError {
  constructor () {
    super('Unauthorized', 401)
  }
}
