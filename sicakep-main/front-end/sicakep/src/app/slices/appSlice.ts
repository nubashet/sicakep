import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AppState {
  appDrawerOpen: boolean
}

const initialState: AppState = {
  appDrawerOpen: true
}

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setAppDrawerOpen(state, action: PayloadAction<boolean>) {
      state.appDrawerOpen = action.payload
    }
  },
})

export const { setAppDrawerOpen } = appSlice.actions
export default appSlice.reducer