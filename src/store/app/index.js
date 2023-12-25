import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
export const appAdapter = createEntityAdapter();

//The App's settings will be stored here
const initialState = appAdapter.getInitialState({
  //The current theme of the app selected by user
  currentTheme: "dark",
});
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    //Setting new theme
    setTheme(state, action) {
      state.currentTheme = action.payload;
    },
  },
});

export const { setTheme } = appSlice.actions;
export default appSlice.reducer;
