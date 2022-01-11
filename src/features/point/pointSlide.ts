import { createSlice } from "@reduxjs/toolkit";
import { Point } from "models/Point";
import { DefaultRootState } from "react-redux";
import { getPoints,saveChangeGrades } from "./pointThunk";

export interface PointState extends DefaultRootState {
  loading: boolean;
  error: string;
  points: Point[]
}

const initialState: PointState = {
  loading: false,
  error: "",
  points: []
};

export const PointSlice = createSlice({
  name: "Point",
  initialState,
  reducers: {
    fetchPointList(state) {
      state.loading = true;
    },
  },
  extraReducers: {
    [getPoints.pending as any]: (state) => {
      state.loading = true;
    },
    [getPoints.rejected as any]: (state, action: any) => {
      state.loading = false;
      state.error = action.payload?.error;
    },
    [getPoints.fulfilled as any]: (state,action: any) => {
      state.loading = false;

      state.points = action.payload.data;
    },
    [saveChangeGrades.pending as any]: (state) => {
      state.loading = true;
    },
    [saveChangeGrades.rejected as any]: (state, action: any) => {
      state.loading = false;
      state.error = action.payload?.error;
    },
    [saveChangeGrades.fulfilled as any]: (state,action: any) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  fetchPointList
} = PointSlice.actions;

const PointReducer = PointSlice.reducer;
export default PointReducer;
