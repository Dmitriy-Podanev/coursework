import { combineReducers, Reducer } from 'redux'
import { appReducer } from './app/reducer'
import { RootState } from './types'

export const rootReducer: Reducer<RootState.State> = combineReducers({
  app: appReducer
})
