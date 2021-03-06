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
import {
  joinClass,
} from "features/class/classThunk";
import { LoadingButton } from "@mui/lab";
import { useHistory } from "react-router";

export default function DialogCreateClass({ open, handleClose }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: StoreState) => state.addClass);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Class>();

  const onSubmit = async function (data: Class) {
    (async () => {
      try {
        const result: any = await dispatch(
          joinClass({ code: data.code, role: 2 })
        );
        const value = unwrapResult(result);
        toast.success("Join the class successfully");

        handleClose();
        history.push(`/class/${value.data.id_class}`);
      } catch (err) {
        toast.error(`Join the class error`);
      }
    })();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Join the class</DialogTitle>
        <Box component="form">
          <DialogContent>
            <TextField
              required
              autoFocus
              margin="dense"
              id="code"
              label="Class's code"
              type="text"
              disabled={loading}
              fullWidth
              variant="standard"
              error={errors?.code ? true : false}
              helperText={
                errors?.code?.type === "required"
                  ? "This field is required"
                  : errors?.code?.type === "minLength"
                  ? "Min length 5"
                  : null
              }
              {...register("classname", {
                required: true,
                minLength: 5,
                pattern: /^(?!\s*$).+/,
              })}
            />
          </DialogContent>
          <DialogActions>
            <Button disabled={loading} onClick={handleClose}>
              Cancel
            </Button>
            <LoadingButton loading={loading} onClick={handleSubmit(onSubmit)}>
              Join
            </LoadingButton>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
