import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DialogsInvite({name,link,open,handleClose}:
    {name:string,link:string,open:boolean,handleClose:()=>void}) {
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Invite</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Copy this link to invite {name}:<br/> <a onClick={(e)=>e.preventDefault()} href={link}>{link}</a> 
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
