import { injectable } from 'tsyringe'
import { DeepPartial, getConnection } from 'typeorm'
import { AuthorEntity } from '../entity/AuthorEntity'
import { BookEntity } from '../entity/BookEntity'
import { Book } from '../types/book'

@injectable()
export class BookRepository implements Book.Repository {
  async attachAuthors (book: BookEntity, authors: AuthorEntity[]): Promise<BookEntity> {
    await getConnection()
      .getRepository(BookEntity)
      .createQueryBuilder()
      .relation(BookEntity, 'authors')
      .of(book)
      .add(authors)

    return await this.getById(book.id)
  }

  async detachAllAuthors (book: BookEntity): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .relation(BookEntity, 'authors')
      .of(book)
      .remove(book.authors)
  }

  async create (bookData: DeepPartial<BookEntity>): Promise<BookEntity> {
    const resultSave = await getConnection()
      .getRepository(BookEntity)
      .save(bookData)

    return await this.getByIdWithRelations(resultSave.id)
  }

  async delete (book: BookEntity): Promise<void> {
    await getConnection()
      .getRepository(BookEntity)
      .remove(book)
  }

  async getAll (): Promise<BookEntity[]> {
    return getConnection()
      .getRepository(BookEntity)
      .find()
  }

  async getAllWithRelations (): Promise<BookEntity[]> {
    return getConnection()
      .getRepository(BookEntity)
      .find({ relations: ['authors', 'genre', 'language', 'publisher', 'image'] })
  }

  async getById (bookId: string | number): Promise<BookEntity | undefined> {
    return getConnection()
      .getRepository(BookEntity)
      .findOne(bookId)
  }

  async getByIdWithRelations (bookId: string | number): Promise<BookEntity | undefined> {
    return getConnection()
      .getRepository(BookEntity)
      .findOne(bookId, { relations: ['authors', 'genre', 'language', 'publisher', 'image'] })
  }

  async hasExistIsbn (isbn: string): Promise<boolean> {
    return !!(await getConnection()
      .getRepository(BookEntity)
      .count({ isbn }))
  }

  async search (value: string): Promise<BookEntity[]> {
    const searchString = `%${value.replace(/\s+/gi, '%')}%`

    return await getConnection()
      .getRepository(BookEntity)
      .createQueryBuilder('book')
      .where('title LIKE :title', { title: searchString })
      .orWhere('isbn LIKE :isbn', { isbn: searchString })
      .orWhere('description LIKE :description', { description: searchString })
      .getMany()

  }

  async update (bookId: number | string, bookData: DeepPartial<BookEntity>): Promise<BookEntity> {
    await getConnection()
      .getRepository(BookEntity)
      .update(bookId, bookData)

    return await this.getByIdWithRelations(bookId)
  }
}
