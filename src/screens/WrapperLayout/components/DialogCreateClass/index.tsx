import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Class, StoreState } from "models";
import { unwrapResult } from "@reduxjs/toolkit";
import { addClass, getAllClassOfUser } from "features/class/classThunk";
import { LoadingButton } from "@mui/lab";
import { AuthContext } from "context/AuthContext";

export default function DialogCreateClass({ open, handleClose }) {
  const dispatch = useDispatch();
  const { user } = React.useContext(AuthContext)
  const { loading } = useSelector((state: StoreState) => state.addClass);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Class>();

  const onSubmit = async function (data: Class) {
    (async () => {
      try {
        const resultData: any = await dispatch(addClass(data));
        unwrapResult(resultData);
        dispatch(getAllClassOfUser(user ? user.id : ""))
        toast.success("Create a new class successfully");
        handleClose()
      } catch (err) {
        toast.error(`Error create a new class`);
      }
    })();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a new class</DialogTitle>
        <Box component="form">
          <DialogContent>
            <TextField
              required
              autoFocus
              margin="dense"
              id="name"
              label="Class's name"
              type="text"
              disabled={loading}
              fullWidth
              variant="standard"
              error={errors?.classname ? true : false}
              helperText={errors?.classname?.type==="required"?"This field is required": errors?.classname?.type==="minLength"?"Min length 5":null}
              {...register("classname", {
                required: true,
                minLength: 5,
                pattern: /^(?!\s*$).+/,
              })}
            />
            <TextField
              margin="dense"
              id="subject"
              label="Subject"
              type="text"
              disabled={loading}
              fullWidth
              variant="standard"
              {...register("subject")}
            />
            <TextField
              margin="dense"
              id="room"
              label="Room"
              type="text"
              disabled={loading}
              fullWidth
              variant="standard"
              {...register("room")}
            />
            <TextField
              margin="dense"
              id="image"
              label="Image"
              type="text"
              disabled={loading}
              fullWidth
              variant="standard"
              {...register("img")}
            />
          </DialogContent>
          <DialogActions>
            <Button disabled={loading} onClick={handleClose}>
              Cancel
            </Button>
            <LoadingButton loading={loading} onClick={handleSubmit(onSubmit)}>
              Create 
            </LoadingButton>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
