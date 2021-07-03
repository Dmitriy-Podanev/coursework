import { App } from "../types/app";

export class HttpError extends Error implements App.Error.HttpError {
  readonly status: number;
  readonly errors: ReadonlyArray<string>;
  readonly name: string = 'HttpError';

  constructor(message: string, status: number, errors: ReadonlyArray<string> = []) {
    super(message)

    this.status = status
    this.errors = errors
  }
}
