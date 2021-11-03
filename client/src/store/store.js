import authReducer from "./authSlice";
import projectReducer from "./projectSlice";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
  },
});
