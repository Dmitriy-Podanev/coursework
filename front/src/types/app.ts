export declare namespace App {
  interface Token {
    accessToken: string;
    refreshToken: string;
  }

  interface TokenPayload {
    readonly id: number;
    readonly login: string;
    readonly exp: number;
    readonly iat: number;
  }

  interface ResponseError {
    message: string;
    status: number;
    timestamp: string; //2021-04-06T11:19:03.806Z,
    method: string;
    path: string;
    errors: string[];
  }
}
