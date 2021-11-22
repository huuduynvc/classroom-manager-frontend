import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
  root:{
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },

  link:{
    color: 'inherit',
    textDecoration: 'none',
    '&.active > div' : {
      backgroundColor: theme.palette.action.selected
    } ,
    '&.active span' : {
      color: theme.palette.primary.main
    } ,
    '&.active svg' : {
      color: theme.palette.primary.main
    } 
  }
}));

export function MainListItems() {
 
  const classes = useStyles();

  return  (
    <div className={classes.root}>
      <NavLink to="/"  className={classes.link}>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Class" />
        </ListItem>
      </NavLink>
      
      <NavLink to="/error" className={classes.link}>
      <ListItem button>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItem>
      </NavLink>
    </div>
  );
}

export const secondaryListItems = (
  <div>
    {/*<ListSubheader inset>Saved reports</ListSubheader>
     <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem> */}
  </div>
);