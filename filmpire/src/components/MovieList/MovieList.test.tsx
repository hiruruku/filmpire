import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom';
import MovieList from './MovieList'; // MovieListコンポーネントの正しいパスを指定してください
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MemoryRouter } from 'react-router-dom';

const theme = createTheme({});

describe('MovieListコンポーネント単体テスト', () => {
  const mockMovies = {
    page: 1,
    results: [
      {
        adult: false,
        genre_ids: [],
        id: 1,
        title: 'Test Movie 1',
        poster_path: '/test1.jpg',
        vote_average: 8,
      },
      {
        adult: false,
        genre_ids: [],
        id: 2,
        title: 'Test Movie 2',
        poster_path: '/test2.jpg',
        vote_average: 7,
      },
    ],
    total_pages: 1,
    total_results: 2,
  };

  test('MovieListコンポーネントが正しくレンダリングされる', () => {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <MovieList movies={mockMovies} />
        </MemoryRouter>
      </ThemeProvider>,
    );

    // Movieコンポーネントが正しい数だけレンダリングされているかを確認
    const movieElements = screen.getAllByRole('movie-grid');
    expect(movieElements).toHaveLength(mockMovies.results.length);
  });
});
