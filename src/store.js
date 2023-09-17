import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './pages/login/LoginSlice'
import menuReducer from './pages/menu/MenuSlice'

export const store = configureStore({
  reducer: {
    login: loginReducer,
    menu: menuReducer
  },
})