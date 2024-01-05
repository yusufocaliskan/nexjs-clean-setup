import { authApi } from "@/services/auth";
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
export const userAdapter = createEntityAdapter();

const initialState = userAdapter.getInitialState({
  informations: {},
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.newRegistration.matchFulfilled,
      (state, action) => {
        console.log("USer : Action Fulfilled -->", action.payload.user);
        state.informations = action.payload.user;
      }
    );
    builder.addMatcher(
      authApi.endpoints.newRegistration.matchPending,
      (state, action) => {
        console.log("Action Pending-->", action);
      }
    );
    builder.addMatcher(
      authApi.endpoints.newRegistration.matchRejected,
      (state, action) => {
        console.log("Action Rejected -->", action);
      }
    );
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        console.log("USer : login Fulfilled -->", action.payload.user);
        state.informations = action.payload.user;
      }
    );
    builder.addMatcher(
      authApi.endpoints.login.matchPending,
      (state, action) => {
        console.log("login Pending-->", action);
      }
    );
    builder.addMatcher(
      authApi.endpoints.login.matchRejected,
      (state, action) => {
        console.log("login Rejected -->", action);
      }
    );
  },
});

export { authApi };
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
