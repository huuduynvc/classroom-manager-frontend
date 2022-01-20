import { Class,User } from 'models';
import { createSlice } from "@reduxjs/toolkit";
import { DefaultRootState } from "react-redux";
import { getAdmins,getUsers,getClasses,createAdmin } from "./adminThunk";

export interface AdminState extends DefaultRootState {
  loading: boolean;
  error: string;
  users: User[];
  classes: Class[];
}

const initialState: AdminState = {
  loading: false,
  error: "",
  users: [],
  classes: [],
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    getAdmins(){

    }
  },
  extraReducers: {
    [getAdmins.pending as any]: (state) => {
      state.loading = true;
      state.error = "";
    },
    [getAdmins.rejected as any]: (state, action: any) => {
      state.loading = false;
    },
    [getAdmins.fulfilled as any]: (state, action) => {
      state.loading = false;
      state.users = action.payload.data;
    },
    [getUsers.pending as any]: (state) => {
      state.loading = true;
      state.error = "";
    },
    [getUsers.rejected as any]: (state, action: any) => {
      state.loading = false;
    },
    [getUsers.fulfilled as any]: (state, action) => {
      state.loading = false;
      state.users = action.payload.data;
    },
    [getClasses.pending as any]: (state) => {
      state.loading = true;
      state.error = "";
    },
    [getClasses.rejected as any]: (state, action: any) => {
      state.loading = false;
    },
    [getClasses.fulfilled as any]: (state, action) => {
      state.loading = false;
      state.classes = action.payload.data;
    },
    [createAdmin.pending as any]: (state) => {
      state.loading = true;
      state.error = "";
    },
    [createAdmin.rejected as any]: (state, action: any) => {
      state.loading = false;
    },
    [createAdmin.fulfilled as any]: (state, action) => {
      state.loading = false;
      state.classes = action.payload.data;
    },
  },
});

// Action creators are generated for each case reducer function
const adminReducer = adminSlice.reducer;
export default adminReducer;
