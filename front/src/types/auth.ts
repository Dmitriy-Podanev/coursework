export declare namespace Auth {
  namespace Login {
    interface Params {
      login: string;
      password: string;
    }
  }

  namespace Refresh {
    interface Params {
      login: string;
      refreshToken: string;
    }
  }
}
