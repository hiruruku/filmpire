import { useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { selectGenreOrCategory } from '../../store/modules/currentGenreOrCategory';
import { useGetMoviesQuery } from '../../api/tmdb';
import { MovieList } from '../../components/exports';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

type UseGetMoviesQueryReturnType = ReturnType<typeof useGetMoviesQuery>;

const Movies = () => {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName } = useSelector((state: RootState) => state.currentGenreOrCategory);
  const { data, isLoading, isError }: UseGetMoviesQueryReturnType = useGetMoviesQuery({ genreIdOrCategoryName, page });
  // エラー発生時の場合
  if (isError) {
    return <div>Failed to load movies.</div>;
  }
  // データのロード中の場合
  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
      >
        <CircularProgress size="4rem" />
      </Box>
    );
  }
  if (!data?.results.length) {
    return (
      <Box
        display="flex"
        alignItems="center"
        mt="20px"
      >
        <Typography variant="h4">
          No movies that match that name.
          <br />
          Please search for something else.
        </Typography>
      </Box>
    );
  }

  return <MovieList movies={data} />;
};
export default Movies;
