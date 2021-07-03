import { Request as RequestExpress } from 'express'
import { DeepPartial } from 'typeorm'
import { UserEntity } from '../entity/UserEntity'


export declare namespace User {
  interface Repository {
    getById (userId: string | number): Promise<UserEntity | undefined>

    getFullByLogin (login: string): Promise<UserEntity | undefined>

    create (userData: DeepPartial<UserEntity>): Promise<UserEntity>

    updateRefreshToken (
      userId: string | number,
      refreshToken: string | null,
      refreshTokenExp: Date | null
    ): Promise<boolean>

    hasExistLogin (login: string): Promise<boolean>

    hasExistEmail (email: string): Promise<boolean>
  }

  namespace Create {
    interface Body {
      login: string;
      email: string;
      password: string;
      passwordConfirm: string;
    }

    type Request = RequestExpress<null, null, Body>
  }
}
