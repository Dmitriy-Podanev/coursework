import { Request as RequestExpress } from 'express'
import { UserEntity } from '../entity/UserEntity'
import { App } from './app'

export declare namespace Auth {
  interface Service {
    getPasswordHash (password: string): Promise<string>

    checkPassword (password: string, hash: string): Promise<boolean>

    getTokenPair (user: UserEntity): Promise<App.TokenPair>

    validateToken (accessToken: string): Promise<App.Token.Payload | null>

    validateRefreshToken (refreshToken: string, user?: UserEntity): Promise<boolean>
  }

  namespace Login {
    interface Body {
      login: string;
      password: string;
    }

    type Request = RequestExpress<null, null, Body>
  }

  namespace Refresh {
    interface Body {
      login: string;
      refreshToken: string;
    }

    type Request = RequestExpress<null, null, Body>
  }
}
