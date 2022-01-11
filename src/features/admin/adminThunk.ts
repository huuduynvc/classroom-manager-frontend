import { User } from 'models/User';
import { createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "api/adminApi";

export const getAdmins = createAsyncThunk(
    'admin/getAdmins',
    async () =>{
        return (await adminApi.getAdmins())
    }
)

export const getUsers = createAsyncThunk(
    'admin/getUsers',
    async () =>{
        return (await adminApi.getUsers())
    }
)

export const getClasses = createAsyncThunk(
    'admin/getClasses',
    async () =>{
        return (await adminApi.getClasses())
    }
)

export const updateUser = createAsyncThunk(
    'admin/updateUser',
    async ({user}:{user:User}) =>{
        return (await adminApi.updateUser(user))
    }
)

export const createAdmin = createAsyncThunk(
    'admin/createAdmin',
    async ({username,name,password}:{username:string,name:string,password:string}) =>{
        return (await adminApi.createAdmin({username,name,password}))
    }
)