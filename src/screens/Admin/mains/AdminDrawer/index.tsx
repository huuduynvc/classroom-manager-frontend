import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ClassIcon from "@mui/icons-material/Class";
import ListItemText from "@mui/material/ListItemText";
import GroupIcon from "@mui/icons-material/Group";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import { AuthContext } from "context/AuthContext";
import { User } from "models";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  link: {
    color: 'inherit',
    textDecoration: 'none',
    '&.active > div': {
      backgroundColor: theme.palette.action.selected
    }, '&.active span': {
      color: theme.palette.primary.main,
    },
    '&.active  .MuiListItemText-root': {
      borderBottom: '3px solid ' + theme.palette.primary.main
    },
    '& span':{
      fontWeight: 500,
      color: '#5f6368',
    }
  }
}));

export default function ClippedDrawer({ children }: { children: any }) {
  const classes = useStyles();
  const {changeUser} = React.useContext(AuthContext)
  const handleLogout = async () => {
    await localStorage.removeItem("token");
    await localStorage.removeItem("refreshToken");
    const newUser:User = { id: "", username: "", password: "", fullname: "", email: "" };
    if (changeUser){
      changeUser(newUser)
    }
  }
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "#F47340",
        }}
      >
        <Toolbar>
          <div style={{display:'flex',justifyContent:'space-between',width:'100%'}}>
          <Typography variant="h6" noWrap component="div">
            Admin
          </Typography>
          <Button onClick={handleLogout} variant="contained">Logout</Button>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {[{text:"Admin accounts",link:"list-admins",icon: <AdminPanelSettingsIcon />}, 
              {text:"User accounts",link:"list-users",icon:<GroupIcon /> },
              {text:"Classes",link:"list-classes",icon: <ClassIcon />}].map(
              (item, index) => (
                <NavLink key={item.text} to={`/admin/${item.link}`} className={classes.link}>
                  <ListItem>
                    <ListItemIcon>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                </NavLink>
              )
            )}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
