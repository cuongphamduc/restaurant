import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogin: false,
  role: ""
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
    }
  },
})

// Action creators are generated for each case reducer function
export const { setIsLogin, setRole} = loginSlice.actions

export default loginSlice.reducer