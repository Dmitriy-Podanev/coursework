import { compare, hash } from 'bcrypt'
import * as crypto from 'crypto'
import * as dayjs from 'dayjs'
import * as jwt from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import { UserEntity } from '../entity/UserEntity'
import { Service } from '../enum/service'
import { App } from '../types/app'
import { Auth } from '../types/auth'
import { Config } from '../types/config'
import { Logger } from '../types/logger'

@injectable()
export class AuthService implements Auth.Service {
  constructor (
    @inject(Service.Config) private config: Config.Service,
    @inject(Service.Logger) private logger: Logger.Service
  ) {
  }

  async checkPassword (password: string, hash: string): Promise<boolean> {
    return await compare(password, hash)
  }

  async getPasswordHash (password: string): Promise<string> {
    return await hash(password, 10)
  }

  async getTokenPair (user: UserEntity): Promise<App.TokenPair> {
    const payload: App.Token.Payload = {
      id: user.id,
      login: user.login
    }

    const pair: App.TokenPair = {
      accessToken: jwt.sign(payload, this.config.secret, { algorithm: 'HS256', expiresIn: this.config.accessTokenExp }),
      refreshToken: crypto.randomBytes(150).toString('base64')
    }

    return pair
  }

  async validateToken (accessToken: string): Promise<App.Token.Payload> {
    try {
      const payload = jwt.verify(accessToken, this.config.secret, { algorithms: ['HS256'] }) as App.Token.Payload
      this.logger.debug(`TokenPayload: ${JSON.stringify(payload)}`)
      return payload
    } catch (err) {
      this.logger.info(`ValidateTokenError: ${err.message}`)
      return null
    }
  }

  async validateRefreshToken (refreshToken: string, user?: UserEntity): Promise<boolean> {
    return !user || user.refreshToken === null || user.refreshToken !== refreshToken || dayjs().isAfter(user.refreshTokenExp);
  }
}
