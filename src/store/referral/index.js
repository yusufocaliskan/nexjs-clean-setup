import {createSlice, createEntityAdapter} from '@reduxjs/toolkit';
import {referralApi} from '@/services/referral';

export const referralAdapter = createEntityAdapter();
const initialState = referralAdapter.getInitialState({
  referrals: {},
});

const referralSlice = createSlice({
  name: 'referral',
  initialState,
  reducers: {
    setReferrals(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(referralApi.endpoints.checkIReferralIdIsValid.matchFulfilled, (state, action) => {
      console.log('checkIReferralIdIsValid -->', action.payload.user);
    });
  },
});

export {referralApi};
export const {setUser} = referralSlice.actions;
export default referralSlice.reducer;
