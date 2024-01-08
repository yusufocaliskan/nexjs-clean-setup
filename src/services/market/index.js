import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import clientBaseQuery from "@/services/clientBaseQuery";
export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: clientBaseQuery(),
  endpoints: (builder) => ({
    check4CandidateData: builder.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        data: data,
      }),
    }),
    getTokenByMail: builder.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        data: data,
      }),
    }),
  }),
});
