import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {connectRouter, routerMiddleware} from "connected-react-router"
import { history } from "utils";
import peopleReducer from "features/people/peopleSlide";
import classReducer from "features/class/classSlide";
import userReducer from "features/user/userSlide";
import gradeReducer from "features/grade/gradeSlide";

const rootReducer = combineReducers({
  router: connectRouter(history),
  people: peopleReducer,
  class: classReducer,
  user: userReducer,
  grade: gradeReducer
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