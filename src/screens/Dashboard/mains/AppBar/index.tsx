import React from 'react'

import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Badge from '@mui/material/Badge';
import AddIcon from '@mui/icons-material/Add';
import ProfileMenu from 'components/ProfileMenu';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';

const drawerWidth = 240;

const AppBarComponent = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
  }));
  
const AppBar = ({open,toggleDrawer}:{open:boolean|undefined,toggleDrawer:() => void}) => {
    return (
        <AppBarComponent position="absolute"
        >
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge color="secondary">
                {/* <NotificationsIcon /> */}
                <AddIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <Badge color="secondary">
                {/* <NotificationsIcon /> */}
                {/* <AccountCircleIcon /> */}
                <ProfileMenu />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBarComponent>
    )
}

export default AppBar
