import { createAsyncThunk } from "@reduxjs/toolkit";
import classApi from "api/classApi";

export const getTeachersOfClass = createAsyncThunk(
    'class/getTeachersOfClass',
    async (id:string) =>{
        return (await classApi.getTeachersById(id))
    }
)

export const getStudentsOfClass = createAsyncThunk(
    'class/getStudentsOfClass',
    async (id:string) =>{
        return (await classApi.getStudentsById(id))
    }
)

export const getClassMember = createAsyncThunk(
    'class/getClassMember',
    async (id:string) =>{
        return (await classApi.getClassMemnersById(id))
    }
)