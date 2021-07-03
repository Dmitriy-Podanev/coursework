import * as bodyParser from 'body-parser'
import * as express from 'express'
import { Request, Response } from 'express'
import * as fileUpload from 'express-fileupload'
import { container } from 'tsyringe'
import { Service } from './enum/service'
import { NotFoundError } from './error/NotFoundError'
import { syntaxErrorMiddleware } from './middleware/syntaxErrorMiddleware'
import { Routes } from './routes'
import { Config } from './types/config'
import { handlerError } from './utils'

export const app = express()

const config = container.resolve<Config.Service>(Service.Config)

app.use(bodyParser.json())
app.use(syntaxErrorMiddleware)
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: config.pathFiles
}))

Routes.forEach(({ method, path, middleware = [], action }) => {
  app[method](`/api/v1${path}`, middleware, async (req: Request, res: Response, next: express.NextFunction) => {
    try {
      await action(req, res, next)
    } catch (err) {
      handlerError(err, req, res)
    }
  })
})

app.all('*', (req: Request, res: Response) => {
  handlerError(new NotFoundError(), req, res)
})

