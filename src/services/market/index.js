import {createApi} from '@reduxjs/toolkit/query/react';
import clientBaseQuery from '@/services/clientBaseQuery';

export const loginApi = createApi({
  reducerPath: 'marketApi',
  baseQuery: clientBaseQuery(),
  endpoints: (builder) => ({
    check4CandidateData: builder.mutation({
      query: (data) => ({
        url: 'auth/login',
        method: 'POST',
        data: data,
      }),
    }),
    getTokenByMail: builder.mutation({
      query: (data) => ({
        url: 'auth/login',
        method: 'POST',
        data: data,
      }),
    }),
  }),
});
