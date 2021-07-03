import { Request as RequestExpress } from 'express'
import { DeepPartial } from 'typeorm'
import { PublisherEntity } from '../entity/PublisherEntity'
import { App } from './app'

export declare namespace Publisher {
  interface Repository {
    getAll (): Promise<PublisherEntity[]>

    getById (publisherId: string | number): Promise<PublisherEntity | undefined>

    create (publisherData: DeepPartial<PublisherEntity>): Promise<PublisherEntity>

    update (publisherId: number | string, publisherData: DeepPartial<PublisherEntity>): Promise<PublisherEntity>

    delete (publisher: PublisherEntity): Promise<void>

    search (value: string): Promise<PublisherEntity[]>

    hasExist (name: string): Promise<boolean>
  }

  namespace List {
    interface Query{
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
}
