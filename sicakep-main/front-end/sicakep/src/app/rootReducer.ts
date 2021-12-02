import { combineReducers } from 'redux'
import counterReducer from '../features/counter/counterSlice'
import userReducer from './slices/userSlice'
import appReducer from './slices/appSlice'
import adminReducer from './slices/adminSlice'

const rootReducer = combineReducers({
  counter: counterReducer,
  userReducer,
  appReducer,
  adminReducer
})

export default rootReducer
