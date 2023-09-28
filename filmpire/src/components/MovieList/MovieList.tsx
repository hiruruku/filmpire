import { css } from '@emotion/react';
import { APIResponse, MovieType } from '../../api/types/tmdb';
import { useTheme, Theme } from '@mui/material/styles';
import { Grid } from '@mui/material';
import { Movie } from '../exports';

type MovieListProps = {
  movies: APIResponse<MovieType>;
};

type MovieListCssReturnType = {
  movieContainer: ReturnType<typeof css>;
};

const getMovieListCss = (theme: Theme): MovieListCssReturnType => ({
  movieContainer: css`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    overflow: auto;
    ${theme.breakpoints.down('sm')} {
      justify-content: center;
    }
  `,
});

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  const theme = useTheme();
  const movieListCss = getMovieListCss(theme);
  console.log('movie list');
  return (
    <Grid
      container
      css={movieListCss.movieContainer}
    >
      {movies.results.map((movie, i) => (
        <Movie
          key={movie.id}
          movie={movie}
          i={i}
        />
      ))}
    </Grid>
  );
};

export default MovieList;
