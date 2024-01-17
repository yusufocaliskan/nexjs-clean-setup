import clientBaseQuery from '@/services/clientBaseQuery';
import {createApi} from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: clientBaseQuery(),
  endpoints: (builder) => ({}),
});
