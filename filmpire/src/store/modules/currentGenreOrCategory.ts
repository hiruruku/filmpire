import { Slice, createSlice } from '@reduxjs/toolkit';

type GenreOrCategoryStateType = {
  genreIdOrCategoryName: number | string;
  page: number;
  searchQuery: string;
};

export const genreOrCategory: Slice<GenreOrCategoryStateType> = createSlice({
  name: 'genreOrCategory',
  initialState: {
    genreIdOrCategoryName: '',
    page: 1,
    searchQuery: '',
  } as GenreOrCategoryStateType,
  reducers: {
    selectGenreOrCategory: (state, action) => {
      // Redux Toolkit uses Immer internally,
      // allowing state objects to be immutably updated using proxies.
      state.genreIdOrCategoryName = action.payload;
    },
  },
});
// actionをexportする場合.actionsから
export const { selectGenreOrCategory } = genreOrCategory.actions;

export default genreOrCategory.reducer;
