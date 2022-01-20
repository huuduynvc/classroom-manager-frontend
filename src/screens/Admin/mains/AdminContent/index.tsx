import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import AddAccountDialog from "screens/Admin/components/AddAccountDialog";
import { createAdmin, getAdmins } from "features/admin/adminThunk";
import { AdminState } from "features/admin/adminSlide";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "models";
import MyProgress from "components/MyProgress";
import AdminDialogDetail from "screens/Admin/components/AdminDialogDetail";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));


// const rows = [
//   createData("tesce1", "Frozen yoghurt"),
//   createData("tesce2", "Ice cream sandwich"),
//   createData("tesce3", "Eclair"),
// ];

export default function AdminContent() {
  const [open, setOpen] = React.useState(false);
  const adminState: AdminState = useSelector(
    (state: StoreState) => state.admin
  );
  const [openDetail,setOpenDetail] = React.useState(false)
  const [info,setInfo] = React.useState<any>(null)
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAdmins());
  }, [dispatch]);
  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <Button onClick={() => setOpen(true)} variant="outlined">
          Add admin
        </Button>
      </div>
      <AddAccountDialog
        isLoading={adminState.loading}
        dispatchFunc={createAdmin}
        open={open}
        dispatchFunc2={getAdmins}
        setOpen={setOpen}
      />
      <AdminDialogDetail open={openDetail} setOpen={setOpenDetail} info={info}/>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Username</StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
              <StyledTableCell align="center">View</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <MyProgress loading={adminState.loading} error={adminState.error}>
              <>
              {adminState.users.map((row) => (
                <StyledTableRow key={row.username}>
                  <StyledTableCell component="th" scope="row">
                    {row.username}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.fullname}</StyledTableCell>
                  <StyledTableCell align="center"> <Button onClick={() => {
                    setOpenDetail(true);
                    setInfo(row);
                    }} variant="contained">Detail</Button></StyledTableCell>
                </StyledTableRow>
              ))}
              </>
            </MyProgress>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
