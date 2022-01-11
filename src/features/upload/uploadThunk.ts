import { createAsyncThunk } from "@reduxjs/toolkit";
import uploadApi from "api/uploadApi";

export const importExcelStudents = createAsyncThunk(
    'upload/importExcelStudents',
    async ({formData,classid}:{formData:any,classid:any}) =>{
        return (await uploadApi.importListUser(classid,formData))
    }
)

export const importExcelGrades = createAsyncThunk(
    'upload/importExcelGrades',
    async ({formData,classid}:{formData:any,classid:any}) =>{
        return (await uploadApi.importGrades(classid,formData))
    }
)