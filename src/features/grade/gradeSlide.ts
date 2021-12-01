import { createSlice } from "@reduxjs/toolkit";
import { Assignment } from "models";
import { DefaultRootState } from "react-redux";
import { getGradeByClassId, updateGradeByClassId } from "./gradeThunk";

export interface GradeState extends DefaultRootState {
  loading: boolean;
  error: string;
  assignments: Assignment[];
}

const initialState: GradeState = {
  loading: false,
  error: "",
  assignments: [],
};

export const gradeSlice = createSlice({
  name: "grade",
  initialState,
  reducers: {
  },
  extraReducers: {
    [getGradeByClassId.pending as any]: (state) => {
      state.loading = true;
    },
    [getGradeByClassId.rejected as any]: (state, action: any) => {
      state.loading = false;
      state.error = action.payload?.error;
    },
    [getGradeByClassId.fulfilled as any]:  (state, action) => {
      state.loading = false;
      state.assignments = action.payload.data;
    },
    [updateGradeByClassId.pending as any]: (state) => {
      state.loading = true;
    },
    [updateGradeByClassId.rejected as any]: (state, action: any) => {
      state.loading = false;
      state.error = action.payload?.error;
    },
    [updateGradeByClassId.fulfilled as any]: (state) => {
      state.loading = false;
    },
  },
});


const gradeReducer = gradeSlice.reducer;
export default gradeReducer;
