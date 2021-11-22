import { createAsyncThunk } from "@reduxjs/toolkit";
import classApi from "api/classApi";

export const getAllClass = createAsyncThunk(
    'class/getAllClass',
    async () =>{
        return (await classApi.getAll())
    }
)