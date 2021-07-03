import { NextFunction, Request as RequestExpress, Response } from 'express'
import { UserEntity } from '../entity/UserEntity'

export declare namespace App {
  namespace Error {
    interface HttpError {
      readonly message: string;
      readonly status: number;
      readonly errors: ReadonlyArray<string>;
    }

    interface Body {
      readonly message: string;
      readonly status: number;
      readonly timestamp: string;
      readonly method: string;
      readonly path: string;
      readonly errors: ReadonlyArray<string>;
    }
  }

  namespace Token {
    interface Payload {
      id: number;
      login: string;

      [key: string]: any;
    }
  }

  interface ParamsDictionary {
    [key: string]: string
  }

  interface ParsedQs { [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[] }

  interface TokenPair {
    accessToken: string;
    refreshToken: string;
  }

  type Request = RequestExpress & {
    user?: UserEntity
  }

  type ErrorMiddleware<T extends Request = Request> = (err: Error, req: T, res: Response, next: NextFunction) => void

  type Action<T extends Request = Request> = (req: T, res: Response, next: NextFunction) => Promise<void>

  interface Route {
    method: 'get' | 'post' | 'put' | 'delete';
    path: string;
    middleware?: Action[];
    action: Action;
  }
}
