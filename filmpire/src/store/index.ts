import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { tmdbApi } from '../api/tmdb';
import genreOrCategoryReducer from './modules/currentGenreOrCategory';

export type StoreType = EnhancedStore<{
  [tmdbApi.reducerPath]: ReturnType<typeof tmdbApi.reducer>;
  currentGenreOrCategory: ReturnType<typeof genreOrCategoryReducer>;
}>;

export const initializeStore = (): StoreType => {
  return configureStore({
    reducer: {
      [tmdbApi.reducerPath]: tmdbApi.reducer,
      currentGenreOrCategory: genreOrCategoryReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbApi.middleware),
  });
};

const store = initializeStore();
export default store;

// export default configureStore({
//     reducer: {
//     [tmdbApi.reducerPath]: tmdbApi.reducer,
//     },
//     middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(tmdbApi.middleware),
// });
