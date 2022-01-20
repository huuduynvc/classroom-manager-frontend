import React from "react";

import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import ProfileMenu from "components/ProfileMenu";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import MenuIcon from "@mui/icons-material/Menu";
import DialogCreateClass from "./../../components/DialogCreateClass/index";
import SchoolIcon from "@mui/icons-material/School";
import DialogJoinClass from "screens/WrapperLayout/components/DialogJoinClass";
import { useLocation } from "react-router";

const drawerWidth = 240;
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBarComponent = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.63)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(9.7px)",
  border: "1px solid rgba(255, 255, 255, 0.35)",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const AppBar = ({
  open,
  toggleDrawer,
}: {
  open: boolean | undefined;
  toggleDrawer: () => void;
}) => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDialogJoin, setOpenDialogJoin] = React.useState(false);
  const location = useLocation();


  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleClickOpenJoin = () => {
    setOpenDialogJoin(true);
  };

  const handleCloseJoin = () => {
    setOpenDialogJoin(false);
  };
  return (
    <AppBarComponent position="absolute" open={open}>
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: "36px",
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="#000"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Class
        </Typography>
        {location.pathname === "/" ? (
          <Tooltip title="Join the class">
            <IconButton
              onClick={handleClickOpen}
              sx={{
                marginRight: "36px",
              }}
            >
              <SchoolIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <></>
        )}
        <Tooltip title="Create a new class">
          <IconButton
            onClick={handleClickOpenJoin}
            sx={{
              marginRight: "36px",
            }}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>

        <IconButton color="inherit">
          <Badge color="secondary">
            <ProfileMenu />
          </Badge>
        </IconButton>
      </Toolbar>
      <DialogCreateClass open={openDialog} handleClose={handleClose} />
      <DialogJoinClass open={openDialogJoin} handleClose={handleCloseJoin} />
    </AppBarComponent>
  );
};

export default AppBar;
