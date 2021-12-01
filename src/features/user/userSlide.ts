import { createSlice } from "@reduxjs/toolkit";
import { DefaultRootState } from "react-redux";
import { loginAction } from "./userThunk";
import { User } from "models/User";
import { saveLogin } from "functions";
import { parseJwt } from "config/axios";

export interface UserState extends DefaultRootState {
  loading: boolean;
  error: string;
  user: User;
}

const initialState: UserState = {
  loading: false,
  error: "",
  user: {
    username: "",
    id: "",
    password: "",
    fullname: "",
    email: "",
    rfToken: "",
    creation_time: "",
    modification_time: "",
    role_member: 0,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(){

    }
  },
  extraReducers: {
    [loginAction.pending as any]: (state) => {
      state.loading = true;
      state.error = "";
    },
    [loginAction.rejected as any]: (state, action: any) => {
      state.loading = false;
    },
    [loginAction.fulfilled as any]: (state, action) => {
      state.loading = false;
      const data = action.payload.data;
      if (data.authenticated === false) {
        state.error = "Wrong email or password";
      } else {
        saveLogin({ token: data.accessToken, refreshToken: data.refreshToken });
        try {
          state.user = parseJwt(data.accessToken)
        }
        catch (err) {
          console.log(err)
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  loginUser
} = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
