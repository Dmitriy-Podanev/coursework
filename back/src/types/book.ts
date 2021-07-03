import { Request as RequestExpress } from 'express'
import { DeepPartial } from 'typeorm'
import { AuthorEntity } from '../entity/AuthorEntity'
import { BookEntity } from '../entity/BookEntity'
import { GenreEntity } from '../entity/GenreEntity'
import { LanguageEntity } from '../entity/LanguageEntity'
import { PublisherEntity } from '../entity/PublisherEntity'
import { App } from './app'

export declare namespace Book {
  interface Repository {
    getAll (): Promise<BookEntity[]>

    getAllWithRelations (): Promise<BookEntity[]>

    getById (bookId: string | number): Promise<BookEntity | undefined>

    getByIdWithRelations (bookId: string | number): Promise<BookEntity | undefined>

    create (bookData: DeepPartial<BookEntity>): Promise<BookEntity>

    update (bookId: number | string, bookData: DeepPartial<BookEntity>): Promise<BookEntity>

    delete (book: BookEntity): Promise<void>

    attachAuthors (book: BookEntity, authors: AuthorEntity[]): Promise<BookEntity>

    detachAllAuthors (book: BookEntity): Promise<void>

    hasExistIsbn (isbn: string): Promise<boolean>

    search (value: string): Promise<BookEntity[]>
  }

  namespace List {
    interface Query {
      search?: string;
    }

    type Request = RequestExpress<null, null, null, Query & App.ParsedQs>
  }

  namespace Create {
    interface Body {
      title: string;
      year: number;
      isbn: string;
      imageId: number;
      genreId: number;
      publisherId: number;
      languageId: number;
      authors: number[];
      description?: string;
    }

    type Request = RequestExpress<null, null, Body>
  }

  namespace Update {
    interface Body {
      id: number;
      title?: string;
      year?: number;
      isbn?: string;
      imageId?: number;
      genreId?: number;
      description?: string;
      publisherId?: number;
      languageId?: number;
      authors?: number[];
    }

    type Request = RequestExpress<null, null, Body>
  }

  namespace Delete {
    interface Params {
      id: number;
    }

    type Request = RequestExpress<Params & App.ParamsDictionary, null, null>
  }

  namespace Single {
    interface Params {
      id: number;
    }

    type Request = RequestExpress<Params & App.ParamsDictionary, null, null>
  }
}
