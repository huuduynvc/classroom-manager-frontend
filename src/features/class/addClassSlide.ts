import { createSlice } from "@reduxjs/toolkit";
import { DefaultRootState } from "react-redux";
import {  addClass} from "./classThunk";

export interface AddClassState extends DefaultRootState {
  loading: boolean;
  error: string;
}

const initialState: AddClassState = {
  loading: false,
  error: "",
};

export const addClassSlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    addNewClass(state) {
      state.loading = true;
    },
  },
  extraReducers: {
    
    [addClass.pending as any]: (state) => {
      state.loading = true;
    },
    [addClass.rejected as any]: (state, action: any) => {
      state.loading = false;
      state.error = action.payload?.error;
    },
    [addClass.fulfilled as any]: (state) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewClass
} = addClassSlice.actions;

const addClassReducer = addClassSlice.reducer;
export default addClassReducer;
