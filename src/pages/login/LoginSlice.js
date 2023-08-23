import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogin: false,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setIsLogin: (state) => {
      console.log("setlogin")
      state.isLogin = true
    }
  },
})

// Action creators are generated for each case reducer function
export const { setIsLogin } = loginSlice.actions

export default loginSlice.reducer