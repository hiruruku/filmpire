import { useState, useEffect } from 'react';
import { TextField, InputAdornment, colors } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { searchMovie } from '../../store/modules/currentGenreOrCategory';
import { useTheme, Theme } from '@mui/material/styles';
import { css } from '@emotion/react';

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
  console.log('Search');
  const theme = useTheme();
  const searchCss = getSearchCss(theme);
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      dispatch(searchMovie(query));
    }
  };

  return (
    <div css={searchCss.searchContainer}>
      <TextField
        onKeyPress={handleKeyPress}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
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
