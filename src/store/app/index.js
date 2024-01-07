import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
export const appAdapter = createEntityAdapter();

//The App's settings will be stored here
const initialState = appAdapter.getInitialState({
  //The current theme of the app selected by user
  currentTheme: "dark_theme",

  //selected language of the app
  selectedLanguage: "en",

  counter: 10,
});

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    //Setting new theme
    setTheme(state, action) {
      state.currentTheme = action.payload;
    },

    //set selected language
    setSelectedLanguage(state, action) {
      state.selectedLanguage = action.payload;
    },

    setCounter(state, action) {
      state.counter = action.payload;
    },
  },
});

export const { setTheme, setSelectedLanguage, setCounter } = appSlice.actions;
export default appSlice.reducer;
