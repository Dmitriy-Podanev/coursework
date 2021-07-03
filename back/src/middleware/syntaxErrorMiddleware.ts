import { NextFunction, Request, Response } from 'express'
import { App } from '../types/app'
import { handlerError } from '../utils'

export const syntaxErrorMiddleware: App.ErrorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  if (err instanceof SyntaxError) {
    handlerError(err, req, res)
    return
  }

  next()
}
