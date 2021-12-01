import { Assignment } from "models";
import { createAsyncThunk } from "@reduxjs/toolkit";
import classApi from "api/classApi";

export const updateGradeByClassId = createAsyncThunk(
  "grade/updateGradeByClassId",
  async ({ id, assignments }: { id: string; assignments: Assignment[] }) => {
    return await classApi.updateGradeByClassId(id, assignments);
  }
);

export const getGradeByClassId = createAsyncThunk(
  "grade/getGradeByClassId",
  async (id: string) => {
    return await classApi.getGradeStructByClassId(id);
  }
);
