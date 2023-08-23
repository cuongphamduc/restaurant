import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './pages/login/LoginSlice'

export const store = configureStore({
  reducer: {
    login: loginReducer,
  },
})