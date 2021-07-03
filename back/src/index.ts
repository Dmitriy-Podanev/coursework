import 'reflect-metadata'
import './bootstrap'
import { container } from 'tsyringe'
import { createConnection } from 'typeorm'
import { app } from './app'
import { Service } from './enum/service'
import { Config } from './types/config'
import { Logger } from './types/logger'

const config = container.resolve<Config.Service>(Service.Config)
const logger = container.resolve<Logger.Service>(Service.Logger)

createConnection().then(async () => {
  app.listen(config.port, () => {
    logger.info(`Application running on port: ${config.port}`)
  })

}).catch(logger.error)

