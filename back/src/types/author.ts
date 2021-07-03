import { Request as RequestExpress } from 'express'
import { DeepPartial } from 'typeorm'
import { AuthorEntity } from '../entity/AuthorEntity'
import { BookEntity } from '../entity/BookEntity'
import { App } from './app'

export declare namespace Author {
  interface Repository {
    getAll (): Promise<AuthorEntity[]>

    getByIdWithRelations (authorId: string | number): Promise<AuthorEntity | undefined>

    getByIdList (authorIdList: Array<string | number>): Promise<AuthorEntity[]>

    create (authorData: DeepPartial<AuthorEntity>): Promise<AuthorEntity>

    update (authorId: number | string, authorData: DeepPartial<AuthorEntity>): Promise<AuthorEntity>

    delete (authorId: number | string): Promise<void>

    hasExist (name: string): Promise<boolean>

    search (name: string): Promise<AuthorEntity[]>
  }

  namespace List {
    interface Query {
      search?: string;
    }

    type Request = RequestExpress<null, null, null, Query & App.ParsedQs>
  }

  namespace Create {
    interface Body {
      name: string;
    }

    type Request = RequestExpress<null, null, Body>
  }

  namespace Update {
    interface Body {
      id: number;
      name: string;
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
