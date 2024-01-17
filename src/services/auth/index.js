import clientBaseQuery from '@/services/clientBaseQuery';
import {createApi} from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: clientBaseQuery(),
  endpoints: (builder) => ({
    newRegistration: builder.mutation({
      query: (data, captchaToken) => ({
        url: 'users',
        method: 'POST',
        data: data,
        headers: {
          'X-reCaptcha-Token': captchaToken,
        },
      }),
    }),
    verfiyEmailOPhoneNumber: builder.mutation({
      query: (data) => ({
        url: '/users/registration/complete',
        method: 'POST',
        data: data,
      }),
    }),
    reSendVerificationCode2Email: builder.mutation({
      query: (data) => ({
        url: '/users/registration/sendemail',
        method: 'POST',
        data: data,
      }),
    }),
    reSendVerificationCode2Sms: builder.mutation({
      query: (data) => ({
        url: '/users/registration/sendsms',
        method: 'POST',
        data: data,
      }),
    }),
    getUserInformations: builder.mutation({
      query: (data) => ({
        url: 'account/informations',
        method: 'GET',
        data: data,
      }),
    }),

    logoutSession: builder.mutation({
      query: (data) => ({
        url: 'users/logout',
        method: 'DELETE',
        data: data,
      }),
    }),
    deletePassword: builder.mutation({
      query: (data) => ({
        url: 'users/password',
        method: 'DELETE',
        data: data,
      }),
    }),
    createPassword: builder.mutation({
      query: (data) => ({
        url: 'users/password',
        method: 'POST',
        data: data,
      }),
    }),
  }),
});
