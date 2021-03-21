import { configureStore } from '@reduxjs/toolkit'

import authenticationReducer from './authenticationSlice'

const store = configureStore({
  reducer: {
    authenticationReducer,
  },
})

export default store
