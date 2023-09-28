// import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
// import { useSelector } from 'react-redux';
import { useGetMoviesQuery } from '../../api/tmdb';
import { MovieList } from '../../components/exports';

type UseGetMoviesQueryReturnType = ReturnType<typeof useGetMoviesQuery>;

const Movies = () => {
  const { data, isLoading, isError }: UseGetMoviesQueryReturnType = useGetMoviesQuery();

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
  // エラー発生時の場合
  if (isError) {
    return <div>Failed to load movies.</div>;
  }

  return <MovieList movies={data} />;
};
export default Movies;
