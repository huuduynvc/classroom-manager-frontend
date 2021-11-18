import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListResponse, Todo } from "models";

export interface TodoState {
  loading: boolean;
  list: Todo[];
}

const initialState: TodoState = {
  loading: false,
  list: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    fetchTodoList(state) {
      state.loading = true;
    },
    fetchTodoSuccess(state, action: PayloadAction<ListResponse<Todo>>) {
      state.loading = false;
      state.list = action.payload.data;
    },
    fetchTodoFailed(state) {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { fetchTodoList, fetchTodoSuccess, fetchTodoFailed } = todoSlice.actions;

const todoReducer = todoSlice.reducer;
export default todoReducer;