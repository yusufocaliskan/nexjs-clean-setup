import { loginApi } from "@/services/auth/login";
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
      loginApi.endpoints.check4CandidateData.matchFulfilled,
      (state, action) => {
        console.log("USer : Action Fulfilled -->", action.payload.user);
        state.informations = action.payload.user;
      },
    );
    builder.addMatcher(
      loginApi.endpoints.getTokenByMail.matchFulfilled,
      (state, action) => {
        console.log("Token Data in Store", action.payload.user);
        state.informations = action.payload.user;
      },
    );

    builder.addMatcher(
      loginApi.endpoints.check4CandidateData.matchPending,
      (state, action) => {
        console.log("Action Pending-->", action);
      },
    );
    builder.addMatcher(
      loginApi.endpoints.check4CandidateData.matchRejected,
      (state, action) => {
        console.log("Action Rejected -->", action);
      },
    );
  },
});

export { loginApi };
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
