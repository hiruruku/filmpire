import { Slice, createSlice } from '@reduxjs/toolkit';

type GenreOrCategoryStateType = {
  genreIdOrCategoryName: number | string;
  page: number;
  searchQuery: string;
};
/**
 構造： sideBarで、RTKQuery(getGenre)を使用し、Genreデータを取得して、sideBarMenuListへデータを送り表示する
 このGenreのListItemButtonをクリックすると、selectGenreOrCategoryに,actionがdispatchされる。
 メイン画面では、useSelectorでこのStateを取得しており値が変更されると、RTKQueryが動いて、新しくAPIに情報を取得しに行く。
 storeでは、reducersごとにstateを保持する。
 このアプリでは、あくまで内部の変更処理。
 このreducersが保持するState
 　　　１: genre番号 number か　Category名 string
   2: page => pagenation用
   3: searchQuery => 検索文字列
*/
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
      state.searchQuery = '';
    },
    searchMovie: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});
// actionをexportする場合.actionsから
export const { selectGenreOrCategory, searchMovie } = genreOrCategory.actions;

export default genreOrCategory.reducer;
