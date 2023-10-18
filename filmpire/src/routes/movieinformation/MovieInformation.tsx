import { Modal, Typography, ButtonGroup, Grid, Box, CircularProgress, useMediaQuery, Rating } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { selectGenreOrCategory } from '../../store/modules/currentGenreOrCategory';
import { useTheme, Theme } from '@mui/material/styles';
import { css } from '@emotion/react';
import { useGetMovieQuery } from '../../api/tmdb';
import { ErrorComponent, LoadingComponent } from '../../components/exports';
import genreIcons from '../../assets/genres';

type MovieInfoCssReturnType = {
  containerSpaceAround: ReturnType<typeof css>;
  poster: ReturnType<typeof css>;
  genresContainer: ReturnType<typeof css>;
  genreImages: ReturnType<typeof css>;
  links: ReturnType<typeof css>;
};

const getMovieInfoCss = (theme: Theme): MovieInfoCssReturnType => ({
  containerSpaceAround: css`
    display: flex;
    justify-content: space-around;
    margin: 10px 0;
    ${theme.breakpoints.down('lg')} {
      flex-direction: column;
      align-items: center;
    }
    ${theme.breakpoints.down('md')} {
      align-items: center;
    }
    ${theme.breakpoints.down('sm')} {
      flex-wrap: wrap;
    }
  `,
  poster: css`
    border-radius: 20px;
    box-shadow: 0.5em 1em 1em rgb(64, 64, 70);
    width: 80%;
    ${theme.breakpoints.down('lg')} {
      margin: 0 auto;
      width: 100%;
      height: 450px;
    }
    ${theme.breakpoints.down('md')} {
      width: 100%;
      height: 350px;
    }
    ${theme.breakpoints.down('sm')} {
      width: 100%;
      height: 300px;
      margin-bottom: 30px;
    }
  `,
  genresContainer: css`
    margin: 10px 0 !important;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  `,
  genreImages: css`
    filter: ${theme.palette.mode === 'dark' ? 'invert(1)' : 'dark'};
    margin-right: 10px;
  `,
  links: css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem 1rem;
  `,
});

const MovieInformation = () => {
  const theme = useTheme();
  const movieInfoCss = getMovieInfoCss(theme);
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const dispatch = useDispatch();
  if (isFetching) {
    return <LoadingComponent />;
  }
  if (error) {
    return <ErrorComponent />;
  }
  console.log(data);
  return (
    <Grid
      container
      css={movieInfoCss.containerSpaceAround}
    >
      <Grid
        item
        sm={12}
        lg={4}
      >
        <img
          css={movieInfoCss.poster}
          src={`${import.meta.env.VITE_TMDB_IMAGE_URL}${data?.poster_path}`}
          alt={data?.title}
        />
      </Grid>
      <Grid
        item
        container
        direction="column"
        lg={7}
      >
        <Typography
          variant="h3"
          align="center"
          gutterBottom
        >
          {' '}
          {/** TODO sm以下で改行 */}
          {data?.title}({data.release_date.split('-')[0]})
        </Typography>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
        >
          {data?.tagline}
        </Typography>
        <Grid
          item
          css={movieInfoCss.containerSpaceAround}
        >
          <Box
            display="flex"
            justifyContent="center"
          >
            <Rating
              readOnly
              value={data.vote_average / 2}
            />
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{ marginLeft: '10px' }}
            >
              {data?.vote_average} / 10
            </Typography>
          </Box>
          <Typography
            variant="h6"
            align="center"
            gutterBottom
            style={{ marginLeft: '15px', marginTop: '5px', lineHeight: '0.99' }}
          >
            {data?.runtime}min {data?.spoken_languages.length > 0 ? `/ ${data?.spoken_languages[0].name}` : ''}
          </Typography>
        </Grid>
        <Grid
          item
          css={movieInfoCss.genresContainer}
        >
          {data?.genres?.map((genre: any) => (
            <Link
              key={genre.name}
              css={movieInfoCss.links}
              to="/"
              onClick={() => {
                dispatch(selectGenreOrCategory(genre.id));
              }}
            >
              <img
                src={genreIcons[genre.name.toLowerCase()]}
                css={movieInfoCss.genreImages}
                height={30}
              />
              <Typography
                color="textPrimary"
                variant="subtitle1"
              >
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
export default MovieInformation;
