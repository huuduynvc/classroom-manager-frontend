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

export const inviteUser = createAsyncThunk(
    'invite/inviteUser',
    async ({email,teacher}:{email:string,teacher:boolean}) =>{
        return (await uploadApi.inviteUser(email,teacher))
    }
)
