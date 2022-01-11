import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {connectRouter, routerMiddleware} from "connected-react-router"
import { history } from "utils";
import peopleReducer from "features/people/peopleSlide";
import classReducer from "features/class/classSlide";
import userReducer from "features/user/userSlide";
import gradeReducer from "features/grade/gradeSlide";
import addClassReducer from "features/class/addClassSlide";
import uploadReducer from "features/upload/uploadSlide";
import PointReducer from "features/point/pointSlide";
import adminReducer from "features/admin/adminSlide";

const rootReducer = combineReducers({
  router: connectRouter(history),
  people: peopleReducer,
  class: classReducer,
  user: userReducer,
  grade: gradeReducer,
  addClass: addClassReducer,
  upload: uploadReducer,
  point: PointReducer,
  admin: adminReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false}).concat(routerMiddleware(history)),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;