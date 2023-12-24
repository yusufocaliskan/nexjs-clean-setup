import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
export const marketAdapter = createEntityAdapter();

const initialState = marketAdapter.getInitialState({
  markets: [
    {
      id: 1,
      title: "USDT/TRY",
    },
    {
      id: 2,
      title: "BTC/USDT",
    },
  ],
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
