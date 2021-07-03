import { injectable } from 'tsyringe'
import { DeepPartial, getConnection } from 'typeorm'
import { UserEntity } from '../entity/UserEntity'
import { User } from '../types/user'

@injectable()
export class UserRepository implements User.Repository {
  async create (userData: DeepPartial<UserEntity>): Promise<UserEntity> {
    return await getConnection()
      .getRepository(UserEntity)
      .save(userData)
  }

  async getById (userId: string | number): Promise<UserEntity | undefined> {
    return await getConnection()
      .getRepository(UserEntity)
      .findOne(userId)
  }

  async update (userId: string | number, userData: DeepPartial<UserEntity>): Promise<boolean> {
    return !!(await getConnection()
      .getRepository(UserEntity)
      .update(userId, userData))?.affected
  }

  async updateRefreshToken (userId: string | number, refreshToken: string, refreshTokenExp: Date): Promise<boolean> {
    return await this.update(userId, {
      refreshToken,
      refreshTokenExp
    })
  }

  async getFullByLogin (login: string): Promise<UserEntity | undefined> {
    return await getConnection()
      .getRepository(UserEntity)
      .findOne({ login }, {
        select: ['id', 'login', 'email', 'enable', 'passwordHash', 'refreshToken', 'refreshTokenExp']
      })
  }

  async hasExistEmail (email: string): Promise<boolean> {
    return !!(await getConnection()
      .getRepository(UserEntity)
      .count({ email }))
  }

  async hasExistLogin (login: string): Promise<boolean> {
    return !!(await getConnection()
      .getRepository(UserEntity)
      .count({ login }))
  }

  async delete (user: UserEntity): Promise<void> {
    await getConnection()
      .getRepository(UserEntity)
      .delete(user)
  }
}
