import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListResponse, Class } from "models";
import { DefaultRootState } from "react-redux";
import { getAllClass } from './classThunk';

export interface ClassState extends DefaultRootState {
  loading: boolean;
  error: string;
  list: Class[];
}

const initialState: ClassState = {
  loading: false,
  error: "",
  list: [],
};

export const classSlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    fetchClassList(state) {
      state.loading = true;
    },
    fetchClassSuccess(state, action: PayloadAction<ListResponse<Class>>) {
      state.loading = false;
      state.list = action.payload.data;
    },
    fetchClassFailed(state,action:any) {
      state.loading = false;
      state.error = action.payload.error
    },
  },
  extraReducers: {
    [getAllClass.pending as any]: (state) => {
      state.loading = true;
    } ,
    [getAllClass.rejected as any]: (state,action:any) => {
      state.loading = false;
      state.error = action.payload.error
    } ,
    [getAllClass.fulfilled as any]: (state,action) => {
      state.loading = false;
      state.list = action.payload.data;
    } 
  }
});

// Action creators are generated for each case reducer function
export const { fetchClassList, fetchClassSuccess, fetchClassFailed } = classSlice.actions;

const classReducer = classSlice.reducer;
export default classReducer;