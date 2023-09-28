import { Typography, Grid } from '@mui/material';
import { MovieType } from '../../api/types/tmdb';
import { useTheme, Theme } from '@mui/material/styles';
import { css } from '@emotion/react';

type MovieProps = {
  movie: MovieType;
  i: number;
};

type MovieCssReturnType = {
  title: ReturnType<typeof css>;
};

const getMovieCss = (theme: Theme): MovieCssReturnType => ({
  title: css`
    color: ${theme.palette.text.primary};
    text-overflow: ellipsis;
    width: 230px;
    white-space: nowrap;
    overflow: hidden;
    margin-top: 10px;
  `,
});

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
    >
      <Typography
        css={movieCss.title}
        variant="h5"
      >
        {movie.title}
      </Typography>
    </Grid>
  );
};
export default Movie;
