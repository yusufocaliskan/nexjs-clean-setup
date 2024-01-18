import {createApi} from '@reduxjs/toolkit/query/react';
import clientBaseQuery from '@/services/clientBaseQuery';

export const accountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery: clientBaseQuery(),
  endpoints: (builder) => ({
    getReferralNickname: builder.mutation({
      query: () => ({
        url: 'account/nickname',
        method: 'GET',
      }),
    }),
    createReferralNickname: builder.mutation({
      query: (nickname) => ({
        url: 'account/nickname' + nickname,
        method: 'GET',
      }),
    }),
  }),
});
