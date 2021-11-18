import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import BoxMui from '@mui/material/Box';
import AppBar from 'screens/Dashboard/mains/AppBar'
import Drawer from 'screens/Dashboard/mains/Drawer'
import Box from 'screens/Dashboard/mains/Box'
//import Chart from './Chart';
//import Orders from './Orders';




function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  // const dispatch = useDispatch()
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // useEffect(function () {
  //   async function loadClasses() {
  //     const userId = 1;
  //     const res = await axiosInstance.get(`/class/${userId}`);
  //     dispatch({
  //       type: 'init',
  //       payload: {
  //         items: res.data,
  //         query: ''
  //       }
  //     });
  //   }
  //   loadClasses();
  // }, []);

  return (
      <BoxMui sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar open={open} toggleDrawer={toggleDrawer}/>
        <Drawer open={open} toggleDrawer={toggleDrawer} />
        <Box/>
      </BoxMui>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}