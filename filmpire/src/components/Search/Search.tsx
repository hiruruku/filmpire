import { useState } from 'react';
import { TextField, InputAdornment, colors } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { searchMovie } from '../../store/modules/currentGenreOrCategory';
import { useTheme, Theme } from '@mui/material/styles';
import { css } from '@emotion/react';
import { RootState } from '../../store/index';
import debounce from 'lodash/debounce';

type SearchCssReturnType = {
  searchContainer: ReturnType<typeof css>;
  input: ReturnType<typeof css>;
};
const getSearchCss = (theme: Theme): SearchCssReturnType => ({
  searchContainer: css`
    ${theme.breakpoints.down('sm')} {
      display: flex;
      justify-content: center;
      width: 100%;
    }
  `,
  input: css`
    color: ${theme.palette.mode === 'light' ? 'black' : 'white'};
    filter: ${theme.palette.mode === 'light' && 'invert(1)'};
    ${theme.breakpoints.down('sm')} {
      margin-top: -10px;
      margin-bottom: 10px;
    }
  `,
});

const Search = () => {
  const theme = useTheme();
  const searchCss = getSearchCss(theme);
  const dispatch = useDispatch();
  const [localQuery, setLocalQuery] = useState('');

  // 関数の実行を遅らせるラップ関数。
  const debouncedSearch = debounce((query: any) => {
    dispatch(searchMovie(query));
  }, 500);

  // event時、reduxのaction Createrにactionを送信する
  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      debouncedSearch(event.target.value);
    }
  };
  const handleChange = (event: any) => {
    setLocalQuery(event.target.value);
    // テキストボックスの値をReduxのstateに保存
    debouncedSearch(event.target.value);
  };
  return (
    <div css={searchCss.searchContainer}>
      <TextField
        onKeyDown={handleKeyDown}
        value={localQuery}
        onChange={handleChange}
        variant="standard"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        css={searchCss.input}
      />
    </div>
  );
};
export default Search;
