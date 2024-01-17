import {createApi} from '@reduxjs/toolkit/query/react';
import clientBaseQuery from '@/services/clientBaseQuery';

export const referralApi = createApi({
  reducerPath: 'referralApi',
  baseQuery: clientBaseQuery(),
  endpoints: (builder) => ({
    checkIReferralIdIsValid: builder.mutation({
      query: (data) => ({
        url: 'referrals/' + data,
        method: 'GET',
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: 'users/login',
        method: 'POST',
        data: data,
      }),
    }),
  }),
});
