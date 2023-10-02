import { render, screen } from '@testing-library/react';
import { describe, beforeAll, beforeEach, afterAll, test, expect } from 'vitest';
import { createServer } from '../../mock/server';
import { generateMovieHandler, movieHandler } from '../../mock/movieHandler';

import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Movies from './Movies';
import { Provider } from 'react-redux';
import { StoreType, initializeStore } from '../../store';
import { rest } from 'msw';

// msw　特定のHandlerとパスパラメータを指定してサーバーの生成
const apiURL = import.meta.env.VITE_TMDB_BASE_URL;
const server = createServer(...movieHandler);
let store: StoreType;
beforeAll(() => server.listen());
beforeEach(() => {
  server.resetHandlers();
  store = initializeStore();
});
afterAll(() => server.close());

describe('Movies コンポーネント', () => {
  test('ローディング中スピーナーを表示する。', async () => {
    server.use(
      generateMovieHandler('popular', {
        page: 1,
        results: [],
        total_pages: 10,
        total_results: 0,
      }),
    );

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Movies />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
  test('エラー発生時、エラーメッセージを表示する', async () => {
    // エラーレスポンスをモックする
    server.use(
      rest.get(`${apiURL}/movie/popular`, (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Movies />
        </Provider>
      </MemoryRouter>,
    );

    // findByTextを使用して非同期的にエラーメッセージが表示されるのを待つ
    const errorMessage = await screen.findByText('Failed to load movies.');
    expect(errorMessage).toBeInTheDocument();
  });
  test('映画のデータがない場合の表示を確認', async () => {
    server.use(
      generateMovieHandler('popular', {
        page: 1,
        results: [],
        total_pages: 10,
        total_results: 0,
      }),
    );

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Movies />
        </MemoryRouter>
      </Provider>,
    );

    const heading = await screen.findByRole('heading', { level: 4 });
    expect(heading).toHaveTextContent(/No movies that match that name./i);
  });
});
