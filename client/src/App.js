import React, { useEffect } from 'react'
import { Provider } from 'react-redux'

import store from './redux/store'

import APIService from './utils/APIService'
import AppRouter from './AppRouter'

function App() {
  useEffect(() => {
    APIService.init('api')
  }, [])

  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  )
}

export default App
