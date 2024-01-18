import clientBaseQuery from '@/services/clientBaseQuery';
import {createApi} from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: clientBaseQuery(),
  endpoints: (builder) => ({
    changeUserPasswod: builder.mutation({
      query: (data) => ({
        url: 'users/password',
        method: 'PUT',
        data: data,
      }),
    }),
    getLoginHistoryOfTheUser: builder.query({
      query: () => ({
        url: 'users/logins',
        method: 'GET',
      }),
    }),
  }),
});
