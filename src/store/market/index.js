import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
export const marketAdapter = createEntityAdapter();

const initialState = marketAdapter.getInitialState({
  markets: [],
  selectedMarket: 1,
});

const marketSlice = createSlice({
  name: "markets",
  initialState,
  reducers: {
    setSelectedMarket(state, action) {
      state.selectedMarket = action.payload;
    },
  },
});

export const { setSelectedMarket } = marketSlice.actions;
export default marketSlice.reducer;
