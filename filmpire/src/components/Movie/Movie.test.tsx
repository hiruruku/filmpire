import { render, screen } from '@testing-library/react';
import { describe, beforeEach, test, expect } from 'vitest';
import '@testing-library/jest-dom';
import Movie from './Movie'; // Movieコンポーネントの正しいパスを指定してください
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MovieType } from '../../api/types/tmdb';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const theme = createTheme({});

describe('Movieコンポーネント単体テスト', () => {
  const mockMovie: MovieType = {
    adult: false,
    genre_ids: [],
    id: 1,
    title: 'Test Movie',
    poster_path: '/test.jpg',
    vote_average: 8,
  };

  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <Movie
            movie={mockMovie}
            i={0}
          />
        </MemoryRouter>
      </ThemeProvider>,
    );
  });

  test('MovieタイトルがTypoGrapyコンポーネントで正しくレンダリングされる', () => {
    const titleTypoGraphy = screen.getByRole('heading', { name: 'Test Movie' });
    expect(titleTypoGraphy).toBeInTheDocument();
  });

  test('正しいmovieIdでMovieLinkコンポーネントがレンダリングされる', () => {
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', '/movie/1');
  });

  test('MovieLinkコンポーネントで画像のAltテキストを取得する', () => {
    const imageElement = screen.getByRole('img', { name: 'Test Movie' });
    expect(imageElement).toHaveAttribute('src', `${import.meta.env.VITE_TMDB_IMAGE_URL}/test.jpg`);
  });

  test('レーティングで平均点が5段階で、表示される', () => {
    const ratingElement = screen.getByLabelText(`${mockMovie.vote_average / 2} Stars`);
    expect(ratingElement).toBeInTheDocument();
  });
  test('Ratingにマウスオーバーすると、ツールチップが表示が正しく表示される', async () => {
    const ratingContainer = screen.getByRole('rating-container');
    await userEvent.hover(ratingContainer);

    const tooltipElement = await screen.findByText(`${mockMovie.vote_average} / 10`);
    expect(tooltipElement).toBeInTheDocument();
  });
});
