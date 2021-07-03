import { apiAuthLogin, apiAuthLogout } from '../../api/auth'
import { browserHistory } from '../../browserHistory'
import { App } from '../../types/app'
import { AppAction } from './appAction'
import { AppState } from './types'

const appFetch = (): AppState.Action.Fetch => ({
  type: AppAction.Fetch
})

const appFetchSuccess = (payload: App.Token): AppState.Action.FetchSuccess => ({
  type: AppAction.FetchSuccess,
  payload
})

const appFetchError = (payload: string): AppState.Action.FetchError => ({
  type: AppAction.FetchError,
  payload
})

export const appClearError = (): AppState.Action.ClearError => ({
  type: AppAction.ClearError
})

const appClear = (): AppState.Action.Clear => ({
  type: AppAction.Clear
})

export const appActions: AppState.ActionThunk = {
  appLogin: params => async (dispatch) => {
    dispatch(appFetch())

    try {
      const tokenPair = await apiAuthLogin(params)
      dispatch(appFetchSuccess(tokenPair))
      browserHistory.push('/')
    } catch (err) {
      dispatch(appFetchError(err.message))
    }
  },
  clearError: () => (dispatch, getState) => {
    const { errorText } = getState().app
    if (errorText !== '') {
      dispatch(appClearError())
    }
  },
  clear: () => async (dispatch) => {
    try {
      await apiAuthLogout()
    } catch (err) {
      console.error(err)
    } finally {
      dispatch(appClear())
    }
  }
}
