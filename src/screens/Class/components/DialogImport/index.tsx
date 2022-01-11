import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { UploadState } from "features/upload/uploadSlide";
import { StoreState } from "models";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";

export default function DialogImport({
  open,
  handleClose,
  importDispatch,
  classid,
  title,
  callback
}: {
  open: boolean;
  handleClose: () => void;
  importDispatch: any;
  classid: string;
  title:string;
  callback:any
}) {
  const dispatch = useDispatch();
  const [file, setFile] = useState<any>(null);
  const uploadState: UploadState = useSelector(
    (state: StoreState) => state.upload
  );

  const handleImport = () => {
    (async () => {
      try {
        const bodyFormData = new FormData();
        bodyFormData.append("input_file", file[0]);
        const result: any = await dispatch(
            importDispatch({ formData: bodyFormData, classid })
        );
        unwrapResult(result);
        toast.success("Upload success");
        callback()
        setFile(null);
        handleClose();
      } catch (error) {
        toast.error("Upload error");
      }
    })();
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Import {title}</DialogTitle>
        <DialogContent>
          <DialogContentText>Choose a file from the local</DialogContentText>
          <Button variant="contained" component="label">
            {file ? file[0].name : "Upload File"}
            <input
              accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFile(e.target.files)
              }
              type="file"
              hidden
            />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setFile(null);
              handleClose();
            }}
          >
            Cancel
          </Button>
          <LoadingButton loading={uploadState.loading} onClick={handleImport}>
            Import
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
