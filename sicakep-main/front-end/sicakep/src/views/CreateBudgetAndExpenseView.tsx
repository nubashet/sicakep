import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchUsers, fetchBudgets, addBudget } from '../app/slices/adminSlice'
import { RootState } from '../app/store'
import CircularProgress from '@mui/material/CircularProgress';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const CreateBudgetExpenseView = () => {
  const dispatch = useAppDispatch()
  const sicakepToken = useAppSelector((state: RootState) => state.userReducer.sicakepToken)
  const { users, budgets, fetchBudgetsLoading, fetchUsersLoading, addBudgetLoading } = useAppSelector((state: RootState) => state.adminReducer)
  const [userId, setUserId] = useState(users.length > 0 ? users[0].id : '')
  const [expenseUserId, setExpenseUserId] = useState('')
  const [value, setValue] = useState(0);
  const [year, setYear] = useState('')

  const selectionHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };

  const yearHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYear(`${event.target.value}`);
  };

  const tabHandleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleBudgetSubmit = () => {
    dispatch(addBudget({ sicakepToken, userId, year }))
  }

  useEffect(() => {
    dispatch(fetchUsers(sicakepToken))
    dispatch(fetchBudgets(sicakepToken))
  }, [dispatch, sicakepToken])

  return(
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={tabHandleChange} aria-label="basic tabs example">
          <Tab label="Buat Tahun Anggaran" {...a11yProps(0)} />
          <Tab label="Input Anggaran" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Stack
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '100ch' },
            alignItems: 'center'
          }}
          noValidate
          autoComplete="off"
        >
          {
            fetchUsersLoading &&
            <CircularProgress />
          }
          {
            !fetchUsersLoading &&
            <>
              <TextField
                id="standard-select-currency"
                select
                label="UPT"
                value={userId}
                onChange={selectionHandleChange}
                helperText="Pilih UPT yang akan dibuat tahun anggarannya"
                variant="standard"
              >
                {users.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField id="standard-basic" label="Tahun Anggaran" type='number' value={year} onChange={yearHandleChange} variant="standard" />
              <Button disabled={userId.length < 1 || year.length < 1 || addBudgetLoading} variant="outlined" onClick={() => handleBudgetSubmit()}>SUBMIT { addBudgetLoading && <CircularProgress /> }</Button>
            </>
          }
        </Stack>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Stack
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '100ch' },
            alignItems: 'center'
          }}
          noValidate
          autoComplete="off"
        >
          {
            fetchUsersLoading &&
            <CircularProgress />
          }
          {
            !fetchUsersLoading &&
            <>
              <TextField
                id="standard-select-currency"
                select
                label="UPT"
                value={userId}
                onChange={selectionHandleChange}
                helperText="Pilih UPT yang akan diinput anggarannya"
                variant="standard"
              >
                {users.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField id="standard-basic" label="Tahun Anggaran" type='number' value={year} onChange={yearHandleChange} variant="standard" />
              <Button disabled={userId.length < 1 || year.length < 1 || addBudgetLoading} variant="outlined" onClick={() => handleBudgetSubmit()}>SUBMIT { addBudgetLoading && <CircularProgress /> }</Button>
            </>
          }
        </Stack>
      </TabPanel>
    </Box>
  )
}

export default CreateBudgetExpenseView
