import { Request as RequestExpress } from 'express'
import { UploadedFile } from 'express-fileupload'
import { DeepPartial } from 'typeorm'
import { BookEntity } from '../entity/BookEntity'
import { FileEntity } from '../entity/FileEntity'
import { App } from './app'

export declare namespace File {
  interface Service {
    getFullPath (fileName: string): string

    getExtension (filename: string): string

    getMime (fileName: string): string

    getSize (fileName: string): number

    exists (fileName: string): boolean

    saveFile (data: Buffer, path: string): Promise<boolean>
  }

  interface Repository {
    getInfoById (fileId: string | number): Promise<FileEntity | undefined>

    create (fileInfo: DeepPartial<FileEntity>): Promise<FileEntity>

    delete (fileId: number | string): Promise<boolean>
  }

  namespace Create {
    interface Body {
      file: any;
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
