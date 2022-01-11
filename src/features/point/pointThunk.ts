import { createAsyncThunk } from "@reduxjs/toolkit";
import pointApi from "api/pointApi";

export const getPoints = createAsyncThunk(
    'point/getPoints',
    async (classId:string) =>{
        return (await pointApi.getPoints(classId))
    }
)
export const saveChangeGrades = createAsyncThunk(
    'point/saveChangeGrades',
    async ({classId,columns,rows}:{classId:string,columns:any,rows:any}) =>{
        return (await pointApi.saveChangeGrades(classId,columns,rows))
    }
)