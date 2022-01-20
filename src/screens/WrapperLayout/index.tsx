import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import BoxMui from "@mui/material/Box";
import AppBar from "./mains/AppBar";
import Drawer from "./mains/Drawer";
import Toolbar from "@mui/material/Toolbar";
import BoxComponent from "@mui/material/Box";
import { axiosInstance } from "config/axios";

function DashboardContent({ children }) {
  const [open, setOpen] = React.useState(false);

  // const dispatch = useDispatch(
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <BoxMui sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar open={open} toggleDrawer={toggleDrawer} />
      <Drawer open={open} toggleDrawer={toggleDrawer} />
      <BoxComponent
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light" ? "#fff" : theme.palette.grey[900],
          flexGrow: 1,
          minHeight: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        {children}
      </BoxComponent>
    </BoxMui>
  );
}

export default function WrapperLayout({ children }) {

  return <DashboardContent>{children}</DashboardContent>;
}
