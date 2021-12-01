import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DialogTitle from '@mui/material/DialogTitle';

export default function AssignmentDialog({ open, handleClose, handleCreate }: { open: boolean, handleClose: () => void, handleCreate }) {
    const [due, setDue] = React.useState<Date | null>(null)
    const [title, setTitle] = React.useState<string>('')
    const [point, setPoint] = React.useState<any | null>(null)
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Assignment</DialogTitle>
                <DialogContent>
                    <TextField value={title} onChange={(newTitle) => setTitle(newTitle.target.value)} label="Title" variant="standard" fullWidth />
                    <TextField type="number" value={point} onChange={(newPoint) => setPoint(newPoint.target.value)} sx={{ marginBottom: "20px", marginTop: "10px" }} label="Point" variant="standard" fullWidth />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            disablePast
                            label="Due"
                            openTo="year"
                            views={['year', 'month', 'day']}
                            value={due}
                            onChange={(newValue) => {
                                setDue(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => {
                        handleCreate(title,point,due)
                        setDue(null)
                        setTitle('')
                        setPoint(null)
                    }}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
