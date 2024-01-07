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
      state.token = action.payload;
    },
    setUserInformations(state, action) {
      state.informations = action.payload;
    },
    cleanUpUserStore(state, action) {
      state.token = {};
      state.informations = {};
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.newRegistration.matchFulfilled,
      (state, action) => {
        //Set the token on success
        state.token = action.payload.data?.Token;
      },
    );

    builder.addMatcher(
      authApi.endpoints.getUserInformations.matchFulfilled,
      (state, action) => {
        state.informations = action.payload.Data;
      },
    );
  },
});

export { authApi };
export const { setUser, setToken, setUserInformations, cleanUpUserStore } =
  userSlice.actions;
export default userSlice.reducer;
