import clientBaseQuery from "@/services/clientBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "loginApi",
  baseQuery: clientBaseQuery(),
  endpoints: (builder) => ({
    newRegistration: builder.mutation({
      query: (data, captchaToken) => ({
        url: "users",
        method: "POST",
        data: data,
        headers: {
          "X-reCaptcha-Token": captchaToken,
        },
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "users/login",
        method: "POST",
        data: data,
      }),
    }),
  }),
});