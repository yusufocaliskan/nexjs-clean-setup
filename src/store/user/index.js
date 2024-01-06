import { authApi } from "@/services/auth";
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
export const userAdapter = createEntityAdapter();

const initialState = userAdapter.getInitialState({
  informations: {},
  token: {},
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },

    //On login
    setToken(state, action) {
      console.log("Herrrreee works", action.payload);
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.newRegistration.matchFulfilled,
      (state, action) => {
        console.log("USer : Action Fulfilled -->", action.payload.data?.Token);
        //Set the token on success
        state.token = action.payload.data?.Token;
      },
    );

    builder.addMatcher(
      authApi.endpoints.getUserInformations.matchFulfilled,
      (state, action) => {
        console.log("USer : Inforrmations -->", action.payload);
        //state.informations = action.payload;
      },
    );
  },
});

export { authApi };
export const { setUser, setToken } = userSlice.actions;
export default userSlice.reducer;
