import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListResponse } from "models";
import { DefaultRootState } from "react-redux";
import { User } from 'models/User';
import { getTeachersOfClass, getStudentsOfClass } from './peopleThunk';

export interface PeopleState extends DefaultRootState {
  loading: boolean;
  error: string;
  list: User[];
}

const initialState: PeopleState = {
  loading: false,
  error: "",
  list: [],
};

export const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    fetchPeopleList(state) {
      state.loading = true;
    },
    fetchPeopleSuccess(state, action: PayloadAction<ListResponse<User>>) {
      state.loading = false;
      state.list = action.payload.data;
    },
    fetchPeopleFailed(state,action:any) {
      state.loading = false;
      state.error = action.payload.error
    },
  },
  extraReducers: {
    [getTeachersOfClass.pending as any]: (state) => {
      state.loading = true;
    } ,
    [getTeachersOfClass.rejected as any]: (state,action:any) => {
      state.loading = false;
      state.error = action.payload.error
    } ,
    [getTeachersOfClass.fulfilled as any]: (state,action) => {
      state.loading = false;
      state.list = action.payload.data;
      console.log(action);
    },

    [getStudentsOfClass.pending as any]: (state) => {
      state.loading = true;
    } ,
    [getStudentsOfClass.rejected as any]: (state,action:any) => {
      state.loading = false;
      state.error = action.payload.error
    } ,
    [getStudentsOfClass.fulfilled as any]: (state,action) => {
      state.loading = false;
      state.list = action.payload.data;
      console.log(action);
    } 
  }
});

// Action creators are generated for each case reducer function
export const { fetchPeopleList, fetchPeopleSuccess, fetchPeopleFailed } = peopleSlice.actions;

const peopleReducer = peopleSlice.reducer;
export default peopleReducer;