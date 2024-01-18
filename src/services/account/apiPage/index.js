import {createApi} from '@reduxjs/toolkit/query/react';
import clientBaseQuery from '@/services/clientBaseQuery';

export const apiPageApi = createApi({
  reducerPath: 'apiPageApi',
  baseQuery: clientBaseQuery(),
  endpoints: (builder) => ({
    getAPIKeys: builder.query({
      query: () => ({
        url: '/api-key',
        method: 'GET',
      }),
    }),
    createAPIKey: builder.mutation({
      query: (name, seesion, authNCode) => ({
        url: '/api-key',
        data: name,
        method: 'POST',
        headers: {
          'X-Action-Session': seesion,
          'X-Google-AuthN': authNCode,
        },
      }),
    }),
    confirmAPIKey: builder.mutation({
      query: (token) => ({
        url: '/api-key/confirm',
        method: 'PUT',
        data: token,
      }),
    }),
    deleteAPIKey: builder.mutation({
      query: (id) => ({
        url: '/api-key/' + id,
        method: 'DELETE',
      }),
    }),
    deleteAllAPI: builder.mutation({
      query: () => ({
        url: '/api-key',
        method: 'DELETE',
      }),
    }),
    updateAPIKey: builder.mutation({
      query: (id, ipAddresses, apiRestrictions, seesion, authNCode) => ({
        url: '/api-key/' + id,
        method: 'PUT',
        data: {ipAddresses, apiRestrictions},
        headers: {
          'X-Action-Session': seesion,
          'X-Google-AuthN': authNCode,
        },
      }),
    }),
  }),
});
