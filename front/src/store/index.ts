import { applyMiddleware, compose, createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import { PersistConfig } from 'redux-persist/es/types'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import { appClearError } from './app/actions'
import { rootReducer } from './reducer'
import { RootState } from './types'

const config: PersistConfig<RootState.State> = {
  key: 'catalog',
  storage
}

const persistedReducer = persistReducer(config, rootReducer)
const composeEnhancers = window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?? compose;

export const store = createStore(persistedReducer, composeEnhancers(
  applyMiddleware(thunk)
))

export const persistor = persistStore(store, {}, async () => {
  const { dispatch } = store
  dispatch(appClearError())
})
