import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { LoadingButton } from "@mui/lab";

type Inputs = {
  name: string;
  username: string;
  password: string;
  //password: string
};
export default function AddAccountDialog({
  open,
  setOpen,
  dispatchFunc,
  isLoading,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  dispatchFunc: any;
  isLoading: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async function (data: any) {
    (async () => {
      try {
        
        const actionResult: any = await dispatch(dispatchFunc(data));
        const currentData = unwrapResult(actionResult);
        if (currentData.status === 200) {
          toast.success("Update profile successfully");
          setOpen(false);
        } else {
          toast.error("Error update profile");
        }
      } catch (err) {
        toast.error("Error update profile");
      }
    })();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create An Account</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            error={errors.username ? true : false}
            {...register("username", { pattern: /^\S+$/g })}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            error={errors.name ? true : false}
            {...register("name", { pattern: /^[^0-9]+$/i })}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            error={errors.password ? true : false}
            {...register("password")}
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={isLoading} onClick={handleClose}>Cancel</Button>
          <LoadingButton loading={isLoading} onClick={handleSubmit(onSubmit)}>Add</LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
