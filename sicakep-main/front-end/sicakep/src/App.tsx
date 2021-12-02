import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import LoginView from './views/LoginView';
import AppDrawerNav from './components/AppDrawerNav';
import { useAppSelector } from './app/hooks'
import { RootState } from './app/store'
import DashboardView from './views/DashboardView'
import BudgetExpenseView from './views/BudgetExpenseView';
import CreateBudgetExpenseView from './views/CreateBudgetAndExpenseView';

function App() {
  const loggedIn: boolean = useAppSelector((state: RootState) => state.userReducer.loggedIn)
  const userData = useAppSelector((state: RootState) => state.userReducer.userData)

  return (
    <>
      {
        !loggedIn &&
        <Routes>
          <Route path='*' element={<Navigate to='/login' />} />
          <Route path='/login' element={<LoginView />} />
        </Routes>
      }
      {
        loggedIn &&
        <AppDrawerNav>
          <Routes>
            <Route path='/login' element={<Navigate to='/' />} />
            <Route
              path='/'
              element={
                <DashboardView />
              }
            />
            <Route
              path='/anggaran'
              element={
                <BudgetExpenseView />
              }
            />
            {
              (userData.role === 'admin' || userData.role === 'super-admin') &&
              <Route
                path='/input-anggaran'
                element={
                  <CreateBudgetExpenseView />
                }
              />
            }
          </Routes>
        </AppDrawerNav>
      }
    </>
  )
}

export default App;
