import { Request, Response } from 'express'
import { ValidationError } from 'yup'
import { BadRequestError } from './error/BadRequestError'
import { HttpError } from './error/HttpError'
import { InternalServerError } from './error/InternalServerError'
import { App } from './types/app'

export const handlerError = (err: Error | HttpError, req: Request, res: Response): void => {
  let error = err

  if (error?.name === 'ValidationError') {
    error = new BadRequestError((error as ValidationError)?.errors ?? [])
  } else if (error?.name !== 'HttpError') {
    error = new InternalServerError([err.message])
  }

  const { status, errors } = error as HttpError

  const body: App.Error.Body = {
    message: error.message,
    status,
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.path,
    errors
  }

  res.status(status).json(body)
}
