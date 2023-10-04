import { createSlice } from '@reduxjs/toolkit';

export const genreOrCategory = createSlice({
  name: 'genreOrCategory',
  initialState: {
    genreOrCategoryName: '',
    page: 1,
    searchQuery: '',
  },
  reducers: {
    selectGenreOrCategory: (state, action) => {
      console.log(action.payload);
      // state.genreOrCategoryName =
    },
  },
});
// actionをexportする場合.actionsから
export const { selectGenreOrCategory } = genreOrCategory.actions;

export default genreOrCategory.reducer;
