import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

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

const PageRoute = () => {
  const params: { id: string } = useParams();
  const history = useHistory();
  const classes = useStyles();

  return (
    <div style={{ margin: "0 auto", width: "40%" }}>
      <List sx={{ display: "flex", justifyContent: "space-around" }}>
        <NavLink to={`/class/${params.id}/detail`} className={classes.link}>
          <ListItem sx={{ width: "auto" }} disablePadding>
            <div onClick={() => history.push(`/class/${params.id}/detail`)}>
              <ListItemButton sx={{ width: "auto" }} autoFocus>
                <ListItemText sx={{ textAlign: "center" }} primary="Detail" />
              </ListItemButton>
            </div>
          </ListItem>
        </NavLink>
        <NavLink to={`/class/${params.id}/classwork`} className={classes.link}>
          <ListItem sx={{ width: "auto" }} disablePadding>
            <div onClick={() => history.push(`/class/${params.id}/classwork`)}>
              <ListItemButton sx={{ width: "auto" }}>
                <ListItemText sx={{ textAlign: "center" }} primary="Classwork" />
              </ListItemButton>
            </div>
          </ListItem>
        </NavLink>
        <NavLink to={`/class/${params.id}/list`} className={classes.link}>
          <ListItem sx={{ width: "auto" }} disablePadding>
            <div onClick={() => history.push(`/class/${params.id}/list`)}>
              <ListItemButton >
                <ListItemText sx={{ textAlign: "center" }} primary="People" />
              </ListItemButton>
            </div>
          </ListItem>
        </NavLink>
        <NavLink to={`/class/${params.id}/point`} className={classes.link}>
          <ListItem sx={{ width: "auto" }} disablePadding>
            <div onClick={() => history.push(`/class/${params.id}/point`)}>
              <ListItemButton >
                <ListItemText sx={{ textAlign: "center" }} primary="Point" />
              </ListItemButton>
            </div>
          </ListItem>
        </NavLink>
      </List>
    </div>
  );
};

export default PageRoute;
