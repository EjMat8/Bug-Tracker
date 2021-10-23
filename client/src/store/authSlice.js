import { createSlice } from "@reduxjs/toolkit";

const authInit = {
  id: "",
  name: "",
  role: "",
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState: authInit,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    signIn(state, action) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.role = action.payload.role;
    },
    signOut(state) {
      state.id = "";
      state.name = "";
      state.role = "";
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
