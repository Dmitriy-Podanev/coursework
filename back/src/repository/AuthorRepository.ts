import { injectable } from 'tsyringe'
import { DeepPartial, getConnection, In, Like } from 'typeorm'
import { AuthorEntity } from '../entity/AuthorEntity'
import { Author } from '../types/author'

@injectable()
export class AuthorRepository implements Author.Repository {
  async create (authorData: DeepPartial<AuthorEntity>): Promise<AuthorEntity> {
    return await getConnection()
      .getRepository(AuthorEntity)
      .save(authorData)
  }

  async delete (authorId: number | string): Promise<void> {
    await getConnection()
      .getRepository(AuthorEntity)
      .delete(authorId)
  }

  async getAll (): Promise<AuthorEntity[]> {
    return await getConnection()
      .getRepository(AuthorEntity)
      .find()
  }

  async getByIdList (authorIdList: Array<string | number>): Promise<AuthorEntity[]> {
    return await getConnection()
      .getRepository(AuthorEntity)
      .find({
        where: {
          id: In<string | number>(authorIdList)
        }
      })
  }

  async getByIdWithRelations (authorId: string | number): Promise<AuthorEntity | undefined> {
    return await getConnection()
      .getRepository(AuthorEntity)
      .findOne(authorId, { relations: ['books'] })
  }

  async hasExist (name: string): Promise<boolean> {
    return !!(await getConnection()
      .getRepository(AuthorEntity)
      .findOne({
        where: { name }
      }))
  }

  async search (name: string): Promise<AuthorEntity[]> {
    const searchString = `%${name.replace(/\s+/gi, '%')}%`

    return await getConnection()
      .getRepository(AuthorEntity)
      .find({ name: Like<string>(searchString) })
  }

  async update (authorId: number | string, authorData: DeepPartial<AuthorEntity>): Promise<AuthorEntity> {
    await getConnection()
      .getRepository(AuthorEntity)
      .update(authorId, authorData)

    return await this.getByIdWithRelations(authorId)
  }
}
