import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from '@mui/material/DialogContentText';
import { LoadingButton } from "@mui/lab";

export default function ConfirmUpdateOrBlock({
  open,
  setOpen,
  content,
  title,
  handleOk
}: {
  setOpen: any;
  open: any;
  content: string;
  title?:string;
  handleOk:any
}) {
  const [loading,setLoading] = React.useState(false)
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <LoadingButton loading={loading} onClick={handleClose}>Cancel</LoadingButton>
          <LoadingButton loading={loading} onClick={() => {
            setLoading(false)
            handleOk()
            setLoading(true)
          }}>Ok</LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
