import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
import { MovieType, APIResponse } from './types/tmdb';

// api
export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      // `Authorization`ヘッダーを追加
      headers.set('Authorization', `Bearer ${TMDB_TOKEN}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMovies: builder.query<APIResponse<MovieType>, number | void>({
      query: (page = 1) => `/movie/popular?page=${page}`,
    }),
  }),
});
export const { useGetMoviesQuery } = tmdbApi;
