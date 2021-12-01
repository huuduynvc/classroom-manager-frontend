import { createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "api/userApi";

export const loginAction = createAsyncThunk(
    'user/loginAction',
    async ({username,password}:{username:string,password:string}) =>{
        return (await userApi.login({username,password}))
    }
)

export const updateProfileAction = createAsyncThunk(
    'user/updateProfileAction',
    async ({id,fullname,studentid}:{id:string,fullname:string,studentid:string}) =>{
        return (await userApi.updateProfile({id,fullname,studentid}))
    }
)