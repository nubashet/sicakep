import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchUsers = createAsyncThunk(
  'admin/fetchUsers',
  async (sicakepToken: string) => {
    const response = await axios.get(`${process.env.REACT_APP_SICAKEP_API}/user/get-all`, { headers: { sicakep_token: sicakepToken } })
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const addBudget = createAsyncThunk(
  'admin/addBudget',
  async ({ sicakepToken, userId, year }: { sicakepToken: string, userId: string, year: string }) => {
    const response = await axios.post(`${process.env.REACT_APP_SICAKEP_API}/budget/add/${userId}`, { year }, { headers: { sicakep_token: sicakepToken } })
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchBudgets = createAsyncThunk(
  'admin/fetchBudgets',
  async (sicakepToken: string) => {
    const response = await axios.get(`${process.env.REACT_APP_SICAKEP_API}/budget/get-all`, { headers: { sicakep_token: sicakepToken } })
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export interface AdminState {
  users: any[]
  budgets: any[]
  fetchUsersLoading: boolean
  fetchBudgetsLoading: boolean
  addBudgetLoading: boolean
}

const initialState: AdminState = {
  users: [],
  budgets: [],
  fetchUsersLoading: true,
  fetchBudgetsLoading: true,
  addBudgetLoading: false
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    addSomething: (state) => {
      console.log(state.fetchUsersLoading)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.fetchUsersLoading = true
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload
        state.fetchUsersLoading = false
      })
      .addCase(fetchBudgets.pending, (state) => {
        state.fetchBudgetsLoading = true
      })
      .addCase(fetchBudgets.fulfilled, (state, action) => {
        console.log(action.payload)
        state.budgets = action.payload
        state.fetchBudgetsLoading = false
      })
      .addCase(addBudget.pending, (state) => {
        state.addBudgetLoading = true
      })
      .addCase(addBudget.fulfilled, (state, action) => {
        console.log(action.payload)
        state.addBudgetLoading = false
      })
  }
})

export const { addSomething } = adminSlice.actions
export default adminSlice.reducer