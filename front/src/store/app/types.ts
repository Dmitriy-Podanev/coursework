import { Action as ActionRedux } from 'redux'
import { App } from '../../types/app'
import { Auth } from '../../types/auth'
import { Thunk } from '../../types/base'
import { AppAction } from './appAction'

export declare namespace AppState {
  interface State {
    readonly loading: boolean;
    readonly accessToken: string;
    readonly refreshToken: string;
    readonly errorText: string;
  }

  namespace Action {
    type Fetch = ActionRedux<AppAction.Fetch>
    type FetchSuccess = ActionRedux<AppAction.FetchSuccess> & { payload: App.Token }
    type FetchError = ActionRedux<AppAction.FetchError> & { payload: string }
    type ClearError = ActionRedux<AppAction.ClearError>
    type Clear = ActionRedux<AppAction.Clear>

    type All = Fetch | FetchSuccess | FetchError | ClearError | Clear
  }

  interface ActionThunk {
    appLogin: Thunk<Auth.Login.Params>
    clearError: Thunk,
    clear: Thunk
  }
}
