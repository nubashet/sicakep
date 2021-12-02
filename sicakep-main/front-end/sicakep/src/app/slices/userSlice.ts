import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import jwtDecode from "jwt-decode"

interface UserData {
  id: string
  username: string
  division: string
  name: string
  role: string
  kanwil: boolean
  iat: number
}

export interface UserState {
  sicakepToken: string
  userData: UserData
  loggedIn: boolean
}

const initialState: UserState = {
  sicakepToken: '',
  userData: {
    id: '',
    username: '',
    division: '',
    name:  '',
    role: '',
    kanwil: false,
    iat: 0
  },
  loggedIn: false
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser(state, action: PayloadAction<string>) {
      const sicakepToken = action.payload
      const decoded = jwtDecode<UserData>(sicakepToken)
      state.sicakepToken = sicakepToken
      state.userData = decoded
      state.loggedIn = true
    },
    logoutUser(state) {
      state.sicakepToken = ''
      state.userData = {
        id: '',
        username: '',
        division: '',
        name:  '',
        role: '',
        kanwil: false,
        iat: 0
      }
      state.loggedIn = false
    }
  },
})

export const { loginUser, logoutUser } = userSlice.actions
export default userSlice.reducer