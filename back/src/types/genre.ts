import { Request as RequestExpress } from 'express'
import { DeepPartial } from 'typeorm'
import { GenreEntity } from '../entity/GenreEntity'
import { App } from './app'

export declare namespace Genre {
  interface Repository {
    getAll (): Promise<GenreEntity[]>

    getById (genreId: number | string): Promise<GenreEntity | undefined>

    create (genreData: DeepPartial<GenreEntity>): Promise<GenreEntity>

    update (genreId: number | string, genreData: DeepPartial<GenreEntity>): Promise<GenreEntity>

    delete (genre: GenreEntity): Promise<void>

    hasExist (name: string): Promise<boolean>
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
