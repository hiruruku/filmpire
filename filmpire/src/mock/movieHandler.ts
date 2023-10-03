import { rest } from 'msw';
import { MovieType, APIResponse } from '../api/types/tmdb';
import { popularMovies } from './data/movieData';

const apiURL = import.meta.env.VITE_TMDB_BASE_URL;

export const generateMovieHandler = (apiParam: string, responseData: APIResponse<MovieType>) => {
  return rest.get(`${apiURL}movie/${apiParam}`, (req, res, ctx) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    return res(ctx.status(200), ctx.json(responseData));
  });
};

export const movieHandler = [
  rest.get(`${apiURL}movie/popular`, (req, res, ctx) => {
    const responseData = popularMovies;
    return res(ctx.status(200), ctx.json(responseData));
  }),
];
