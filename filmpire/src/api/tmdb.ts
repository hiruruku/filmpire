import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
import { MovieType, APIResponse, GenresResponse } from './types/tmdb';

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
  refetchOnReconnect: false,
  refetchOnFocus: false,
  endpoints: (builder) => ({
    getGenres: builder.query<GenresResponse, void>({
      query: () => `genre/movie/list?language=en`,
      keepUnusedDataFor: 60 * 60 * 24,
    }),
    // Movies by [Type]
    getMovies: builder.query<APIResponse<MovieType>, any>({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        // Get Movies by Search
        if (searchQuery) {
          return `search/movie?query=${searchQuery}&page=${page}`;
        }
        // Get Movies by Category
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
          return `movie/${genreIdOrCategoryName}?page=${page}`;
        }
        // Get Movies by Genre
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}`;
        }
        // Get Popular Movie>Start時、MenuListが押されていない時
        return `movie/popular?page${page}`;
      },
    }),
    getMovie: builder.query({
      // tmdbAPIはmovie/:movieIdで映画の詳細、movie/:movieId/videosで映画のビデオ取得する
      // 詳細に加え、videos,creditを同時に欲しい場合、append_to_responseでResponseに追加される
      query: (id) => `movie/${id}?append_to_response=videos,credits`
    })
  }),
});
export const { useGetGenresQuery, useGetMoviesQuery,useGetMovieQuery} = tmdbApi;
