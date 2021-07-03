import { Request as RequestExpress } from 'express'
import { DeepPartial } from 'typeorm'
import { LanguageEntity } from '../entity/LanguageEntity'
import { App } from './app'

export declare namespace Language {
  interface Repository {
    getAll (): Promise<LanguageEntity[]>

    getById (languageId: string | number): Promise<LanguageEntity | undefined>

    create (languageData: DeepPartial<LanguageEntity>): Promise<LanguageEntity>

    update (languageId: number | string, languageData: DeepPartial<LanguageEntity>): Promise<LanguageEntity>

    delete (language: LanguageEntity): Promise<void>

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
