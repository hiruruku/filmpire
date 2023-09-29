import { Typography, Grid, Grow, Rating, Tooltip } from '@mui/material';
import { MovieType } from '../../api/types/tmdb';
import { useTheme, Theme } from '@mui/material/styles';
import { css } from '@emotion/react';
import { MovieLink } from '../exports';

type MovieCssReturnType = {
  movie: ReturnType<typeof css>;
  title: ReturnType<typeof css>;
};
const getMovieCss = (theme: Theme): MovieCssReturnType => ({
  movie: css`
    padding: 10px;
  `,
  title: css`
    color: ${theme.palette.text.primary};
    text-overflow: ellipsis;
    width: 230px;
    white-space: nowrap;
    overflow: hidden;
    margin-top: 10px;
    text-align: center;
  `,
});

type MovieProps = {
  movie: MovieType;
  i: number;
};

const Movie: React.FC<MovieProps> = ({ movie, i }) => {
  console.log(movie, i);
  const theme = useTheme();
  const movieCss = getMovieCss(theme);

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      xl={2}
      css={movieCss.movie}
    >
      <Grow
        in
        key={i}
        timeout={(i + 1) * 250}
      >
        <div>
          <MovieLink
            movieId={movie.id}
            posterPath={movie.poster_path}
            title={movie.title}
          >
            <Typography
              css={movieCss.title}
              variant="h5"
            >
              {movie.title}
            </Typography>
            <Tooltip
              disableTouchListener
              title={`${movie.vote_average} / 10`}
            >
              <div role="rating-container">
                <Rating
                  readOnly
                  value={movie.vote_average / 2}
                  precision={0.1}
                />
              </div>
            </Tooltip>
          </MovieLink>
        </div>
      </Grow>
    </Grid>
  );
};
export default Movie;
