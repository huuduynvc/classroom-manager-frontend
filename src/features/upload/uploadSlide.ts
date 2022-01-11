import { createSlice } from "@reduxjs/toolkit";
import { DefaultRootState } from "react-redux";
import { importExcelGrades,importExcelStudents } from "./uploadThunk";

export interface UploadState extends DefaultRootState {
  loading: boolean;
  error: string;
}

const initialState: UploadState = {
  loading: false,
  error: "",
};

export const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    fetchuploadList(state) {
      state.loading = true;
    },
  },
  extraReducers: {
    [importExcelGrades.pending as any]: (state) => {
      state.loading = true;
    },
    [importExcelGrades.rejected as any]: (state, action: any) => {
      state.loading = false;
      state.error = action.payload?.error;
    },
    [importExcelGrades.fulfilled as any]: (state) => {
      state.loading = false;
    },
    [importExcelStudents.pending as any]: (state) => {
      state.loading = true;
    },
    [importExcelStudents.rejected as any]: (state, action: any) => {
      state.loading = false;
      state.error = action.payload?.error;
    },
    [importExcelStudents.fulfilled as any]: (state) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  fetchuploadList
} = uploadSlice.actions;

const uploadReducer = uploadSlice.reducer;
export default uploadReducer;
