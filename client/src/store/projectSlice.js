import { createSlice } from "@reduxjs/toolkit";

const projectInit = {
  projects: {},
};

const projectSlice = createSlice({
  name: "project",
  initialState: projectInit,
  reducers: {
    setProjects(state, action) {
      state.projects = { ...state.projects, ...action.payload };
    },
  },
});

export const projectActions = projectSlice.actions;

export default projectSlice.reducer;
