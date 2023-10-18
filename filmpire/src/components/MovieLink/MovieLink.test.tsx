import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import MovieLink from './MovieLink'; // 適切なパスに変更してください

describe('MovieLinkコンポーネント単体テスト', () => {
  const mockMovieId = 1;
  const mockPosterPath = 'test.jpg';
  const mockTitle = 'Test Movie';

  test('MovieLinkコンポーネントが正しくレンダリングされる', () => {
    render(
      <MemoryRouter>
        <MovieLink
          movieId={mockMovieId}
          posterPath={mockPosterPath}
          title={mockTitle}
        >
          <span>Test Child</span>
        </MovieLink>
      </MemoryRouter>,
    );
    //　正しいLinkの生成
    const linkElement = screen.getByRole('link', { name: `${mockTitle} Test Child` });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', `/movie/${mockMovieId}`);
    // imgのsrc属性が正しく設定される
    const imageElement = screen.getByRole('img', { name: mockTitle });
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', `${import.meta.env.VITE_TMDB_IMAGE_URL}${mockPosterPath}`);
    // child要素の確認
    const childElement = screen.getByText('Test Child');
    expect(childElement).toBeInTheDocument();
  });

  test('posterPathがnullの場合、デフォルトの画像URLが使用される', () => {
    render(
      <MemoryRouter>
        <MovieLink
          movieId={mockMovieId}
          posterPath={null}
          title={mockTitle}
        >
          <span>Test Child</span>
        </MovieLink>
      </MemoryRouter>,
    );

    const imageElement = screen.getByRole('img', { name: mockTitle });
    expect(imageElement).toHaveAttribute('src', import.meta.env.VITE_DEFAULT_IMAGE_FULL_PATH);
  });
});
