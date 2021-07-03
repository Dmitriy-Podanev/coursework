import * as crypto from 'crypto'
import { join } from 'path'
import { injectable } from 'tsyringe'
import { LogLevel } from '../enum/log-level'
import { Config } from '../types/config'

@injectable()
export class ConfigServiceJson implements Config.Service {
  readonly port: number
  readonly logLevel: LogLevel
  readonly accessTokenExp: number;
  readonly refreshTokenExp: number;
  readonly secret: Buffer;
  readonly pathFiles: string;

  constructor () {
    const data = require('../../config/config.json')

    this.port = data.port
    this.logLevel = data.logLevel
    this.accessTokenExp = data.accessTokenExp
    this.refreshTokenExp = data.refreshTokenExp
    this.secret = crypto.randomBytes(1024)
    this.pathFiles = join(__dirname, '../../upload')
  }
}
