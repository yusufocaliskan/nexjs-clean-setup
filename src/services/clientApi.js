import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const clientApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.cizgi.studio/v1" }),
  endpoints: () => {},
});
