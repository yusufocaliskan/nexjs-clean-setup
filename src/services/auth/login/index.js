import clientBaseQuery from "@/services/clientBaseQuery";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: clientBaseQuery({ baseUrl: "https://api.cizgi.studio/v1/" }),
  endpoints: (builder) => ({
    check4CandidateData: builder.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        data: data,
      }),
    }),
  }),
});
