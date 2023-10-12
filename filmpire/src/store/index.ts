import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { tmdbApi } from '../api/tmdb';
import genreOrCategoryReducer from './modules/currentGenreOrCategory';
import userReducer from '../store/modules/auth';

export type StoreType = EnhancedStore<{
  [tmdbApi.reducerPath]: ReturnType<typeof tmdbApi.reducer>;
  currentGenreOrCategory: ReturnType<typeof genreOrCategoryReducer>;
  user: ReturnType<typeof userReducer>;
}>;

export const initializeStore = (): StoreType => {
  return configureStore({
    reducer: {
      [tmdbApi.reducerPath]: tmdbApi.reducer,
      currentGenreOrCategory: genreOrCategoryReducer,
      user: userReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbApi.middleware),
  });
};

const store = initializeStore();
// app全体でRootStateを使用して、Redexのstateの型を参照できる
export type RootState = ReturnType<typeof store.getState>;
export default store;
