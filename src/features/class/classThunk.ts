import { Class } from 'models';
import { createAsyncThunk } from "@reduxjs/toolkit";
import classApi from "api/classApi";

export const getAllClass = createAsyncThunk(
    'class/getAllClass',
    async () =>{
        return (await classApi.getAll())
    }
)

export const getAllClassOfUser = createAsyncThunk(
    'class/getAllClassOfUser',
    async (id:string) =>{
        return (await classApi.findByUserId(id))
    }
)

export const getClassById = createAsyncThunk(
    'class/getClassById',
    async (id:string) =>{
        return (await classApi.getById(id))
    }
)

export const addClass = createAsyncThunk(
    'class/addClass',
    async (newClass:Class) =>{
        return (await classApi.add(newClass))
    }
)


export const joinClass = createAsyncThunk(
    'class/joinClass',
    async ({code,role}:{code:any,role:any}) =>{
        return (await classApi.joinClass(code,role))
    }
)