import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import "./styles.css"
import moment from "moment";

export default function AdminDialogDetail({
  open,
  setOpen,
  info
}: {
  setOpen: any;
  open: any;
  info?: any
}) {
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
          {"Admin detail"}
        </DialogTitle>
        <DialogContent>
          {
              info?<ul className="admin-dialog-detail">
              <li><strong>Name:</strong> <span>{info.fullname}</span></li>
              <li><strong>Email:</strong> <span>{info.email}</span></li>
              <li><strong>Refresh Token:</strong> <span>{info.rfToken}</span></li>
              <li><strong>Username:</strong> <span>{info.username}</span></li>
              <li><strong>Created time:</strong> <span>{moment(new Date(info.creation_time)).format("DD-MM-YYYY")}</span></li>
          </ul>:<></>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
