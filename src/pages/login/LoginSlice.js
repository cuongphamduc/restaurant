import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogin: false,
  role: "",
  userName: ""
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setIsLogin: (state) => {
      state.isLogin = true
    },
    setRole: (state, action) => {
      state.role = action.payload
    },
    setUserName: (state, action) => {
      state.userName = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setIsLogin, setRole, setUserName } = loginSlice.actions

export default loginSlice.reducer