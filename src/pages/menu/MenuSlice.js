import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isCreateFormMenu: false
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setIsCreateFormMenu: (state, action) => {
      state.isCreateFormMenu = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setIsCreateFormMenu } = menuSlice.actions

export default menuSlice.reducer