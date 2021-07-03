import { inject, injectable } from 'tsyringe'
import * as winston from 'winston'
import { LogLevel } from '../enum/log-level'
import { Service } from '../enum/service'
import { Config } from '../types/config'
import { Logger } from '../types/logger'

@injectable()
export class LoggerService implements Logger.Service {
  private logger: winston.Logger

  constructor (@inject(Service.Config) private config: Config.Service) {
    this.logger = winston.createLogger({
      level: config.logLevel,
      transports: new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.printf(it => `${it.timestamp} [${it.level}]:\t${it.message}`)
        )
      })
    })
  }

  log (level: LogLevel, message: string): void {
    this.logger.log(level, message)
  }

  error (message: string): void {
    this.log(LogLevel.Error, message)
  }

  warn (message: string): void {
    this.log(LogLevel.Warn, message)
  }

  info (message: string): void {
    this.log(LogLevel.Info, message)
  }

  http (message: string): void {
    this.log(LogLevel.Http, message)
  }

  verbose (message: string): void {
    this.log(LogLevel.Verbose, message)
  }

  debug (message: string): void {
    this.log(LogLevel.Debug, message)
  }

  silly (message: string): void {
    this.log(LogLevel.Silly, message)
  }
}
