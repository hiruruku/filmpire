import { MovieType, APIResponse } from '../../api/types/tmdb';

export const defaultMovies: APIResponse<MovieType> = {
  page: 1,
  results: [
    {
      adult: false,
      genre_ids: [],
      id: 1,
      title: 'Vitest Good',
      poster_path: '/test1.jpg',
      vote_average: 8,
    },
    {
      adult: false,
      genre_ids: [],
      id: 2,
      title: 'Vitest Blue',
      poster_path: '/test2.jpg',
      vote_average: 7,
    },
  ],
  total_pages: 10,
  total_results: 200,
};
export const popularMovies: APIResponse<MovieType> = {
  page: 1,
  results: [
    {
      adult: false,
      genre_ids: [],
      id: 1,
      title: 'Vitest Good',
      poster_path: '/test1.jpg',
      vote_average: 8,
    },
    {
      adult: false,
      genre_ids: [],
      id: 2,
      title: 'Vitest Blue',
      poster_path: '/test2.jpg',
      vote_average: 7,
    },
  ],
  total_pages: 10,
  total_results: 200,
};
