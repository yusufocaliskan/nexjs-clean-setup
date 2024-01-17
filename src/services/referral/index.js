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
    getMyReferrals: builder.mutation({
      query: (data) => ({
        url: '/users/referrals',
        method: 'GET',
        data: data,
      }),
    }),
    getMyReferralsCountWithKYC: builder.mutation({
      query: () => ({
        url: '/users/referrals/count',
        method: 'GET',
      }),
    }),
    getMyLatestCommissions: builder.mutation({
      query: () => ({
        url: '/users/commission',
        method: 'GET',
      }),
    }),
    getMyCommissionBalance: builder.mutation({
      query: () => ({
        url: '/users/commission/balance',
        method: 'GET',
      }),
    }),
    getTopCommissions: builder.mutation({
      query: () => ({
        url: '/commissions/top',
        method: 'GET',
      }),
    }),
  }),
});
