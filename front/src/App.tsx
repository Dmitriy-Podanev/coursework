import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { browserHistory } from './browserHistory'
import { Routes } from './pages/Routes'
import { persistor, store } from './store'

interface Props {
}

export const App: React.FC<Props> = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router history={browserHistory}>
        <Routes />
      </Router>
    </PersistGate>
  </Provider>
)
