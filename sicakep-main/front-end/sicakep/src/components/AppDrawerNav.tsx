import React from 'react'
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GavelIcon from '@mui/icons-material/Gavel';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import sicakepLogo from '../assets/sicakep-logo.png'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { RootState } from '../app/store'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { logoutUser } from '../app/slices/userSlice'
import { setAppDrawerOpen } from '../app/slices/appSlice'
import { useNavigate } from "react-router-dom"

const drawerWidth = 240;

function BasicMenu() {
  const userData = useAppSelector((state: RootState) => state.userReducer.userData)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ color: '#ffffff' }}
      >
        {userData.name}
        <KeyboardArrowDownIcon sx={{ color: '#ffde59' }} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {
          (userData.role === 'admin' || userData.role === 'super-admin') &&
          <MenuItem onClick={() => navigate('/input-anggaran')}>Masukan Anggaran</MenuItem>
        }
        <MenuItem onClick={() => dispatch(logoutUser())}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const AppDrawerNav = (props: any) => {
  const theme = useTheme();
  const appDrawerOpen = useAppSelector((state: RootState) => state.appReducer.appDrawerOpen)
  const drawerNavList = [
    {
      title: 'Beranda',
      routeName: '/'
    },
    {
      title: 'Realisasi Anggaran',
      routeName: '/anggaran'
    },
    {
      title: 'Hukuman Disiplin',
      routeName: '/'
    },
    {
      title: 'Absensi Pegawai',
      routeName: '/'
    },
  ]

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleDrawerOpen = () => {
    dispatch(setAppDrawerOpen(true))
  };

  const handleDrawerClose = () => {
    dispatch(setAppDrawerOpen(false))
  };

  return(
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" style={{ backgroundColor: '#091150' }} open={appDrawerOpen}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(appDrawerOpen && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <div
            style={{
              flexGrow: 1
            }}
          >
            {
              !appDrawerOpen &&
              <img
                src={sicakepLogo}
                alt="SICAKEP LOGO"
                style={{
                  width: 200
                }}
              />
            }
          </div>
          <BasicMenu />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={appDrawerOpen}>
        <DrawerHeader style={{ backgroundColor: '#091150' }}>
          <img
            src={sicakepLogo}
            alt="SICAKEP LOGO"
            style={{
              width: 200
            }}
          />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon sx={{ color: 'white' }} /> : <ChevronLeftIcon sx={{ color: 'white' }} />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {drawerNavList.map((item, index) => (
          // HomeIcon, AttachMoneyIcon, GavelIcon, FactCheckIcon
            <ListItem button key={item.title} onClick={() => navigate(item.routeName)}>
              <ListItemIcon>
                {item.title === 'Beranda' && <HomeIcon />}
                {item.title === 'Realisasi Anggaran' && <AttachMoneyIcon />}
                {item.title === 'Hukuman Disiplin' && <GavelIcon />}
                {item.title === 'Absensi Pegawai' && <FactCheckIcon />}
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        { props.children }
      </Box>
    </Box>
  )  
}

export default AppDrawerNav
