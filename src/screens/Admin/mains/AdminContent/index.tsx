import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import AddAccountDialog from 'screens/Admin/components/AddAccountDialog';
import { createAdmin } from 'features/admin/adminThunk';
import { AdminState } from 'features/admin/adminSlide';
import { useSelector } from 'react-redux';
import { StoreState } from 'models';

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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  username: string,
  name: string,
) {
  return { username,name };
}

const rows = [
  createData('tesce1','Frozen yoghurt'),
  createData('tesce2','Ice cream sandwich'),
  createData('tesce3','Eclair'),
];

export default function AdminContent() {
  const [open, setOpen] = React.useState(false);
  const adminState:AdminState = useSelector((state:StoreState) => state.admin)
  return (
    <div>
        <div style={{marginBottom:10}}><Button onClick={() => setOpen(true)} variant="outlined">Add admin</Button></div>
        <AddAccountDialog isLoading={adminState.loading} dispatchFunc={createAdmin} open={open} setOpen={setOpen}/>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell >Username</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.username}>
              <StyledTableCell component="th" scope="row">
                {row.username}
              </StyledTableCell>
              <StyledTableCell align="right">{row.name}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
