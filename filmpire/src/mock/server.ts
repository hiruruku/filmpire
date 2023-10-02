// src/mocks/server.ts
import { setupServer } from 'msw/node';
import { RestHandler, MockedRequest, DefaultBodyType } from 'msw';

// モックサーバーのセットアップ
const createServer = (...handlers: RestHandler<MockedRequest<DefaultBodyType>>[]) => {
  const server = setupServer(...handlers);
  return server;
};

export { createServer };
