import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import APIService from '../utils/APIService'

const clearDataFunction = (state) => {
  state.token = null
  state.email = null
  state.isAuth = false
}

const checkAuth = createAsyncThunk(
  'authentication/checkAuth',
  async (_, thunkAPI) => {
    const { email, token } = thunkAPI.getState().authenticationReducer
    const response = await APIService.checkAuth(email, token)
    return response
  }
)

const registration = createAsyncThunk(
  'authentication/registration',
  async ({ email, password }, thunkAPI) => {
    const response = await APIService.registration(email, password)
    return response
  }
)

const login = createAsyncThunk(
  'authentication/login',
  async ({ email, password }, thunkAPI) => {
    const response = await APIService.login(email, password)
    return response
  }
)

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    isAuth: false,
    token: null,
    email: null,
  },
  reducers: {
    setData: (state, action) => {
      state.token = action.payload.token
      state.email = action.payload.email
    },
    clearData: (state) => {
      state.isAuth = false
      state.token = null
      state.email = null
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.token = action.payload.token
      state.email = action.meta.arg.email
    },
    [login.rejected]: (_, action) => alert(action.error.message),
    [registration.fulfilled]: (_, action) =>
      alert(`User ${action.meta.arg.email} was created!`),
    [registration.rejected]: (_, action) => alert(action.error.message),
    [checkAuth.rejected]: (state, action) => {
      alert(action.error.message)
      clearDataFunction(state)
    },
    [checkAuth.fulfilled]: (state) => {
      state.isAuth = true
    },
  },
})
const { actions, reducer } = authenticationSlice

export const { setData, clearData } = actions

export { checkAuth, registration, login }

export default reducer
