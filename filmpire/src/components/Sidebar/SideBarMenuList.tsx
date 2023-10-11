import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { useTheme, Theme } from '@mui/material/styles';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';

import { GenresResponse } from '../../api/types/tmdb';
import genreIcons from '../../assets/genres';
import { selectGenreOrCategory } from '../../store/modules/currentGenreOrCategory';
import { memo } from 'react';

type SideMenuCssReturnType = {
  links: ReturnType<typeof css>;
  genreImages: ReturnType<typeof css>;
};

const getSideMenuCss = (theme: Theme): SideMenuCssReturnType => ({
  links: css`
    color: ${theme.palette.text.primary};
    text-decoration: none;
  `,
  genreImages: css`
    filter: ${theme.palette.mode === 'dark' ? 'invert(1)' : 'dark'};
  `,
});

type SideBarMenuList = {
  displayArray: GenresResponse;
};

const SideBarMenuList: React.FC<SideBarMenuList> = memo(({ displayArray }) => {
  const { genreIdOrCategoryName } = useSelector((state: RootState) => state.currentGenreOrCategory);

  const theme = useTheme();
  const sideMenuCss = getSideMenuCss(theme);
  const dispatch = useDispatch();
  const isCategory = displayArray.category ?? false;

  console.log(genreIdOrCategoryName);
  console.log('data', displayArray);
  return (
    <>
      {displayArray.genres.map(({ id, name }) => (
        <Link
          key={name}
          css={sideMenuCss.links}
          to="/"
        >
          <ListItemButton
            onClick={() => {
              dispatch(selectGenreOrCategory(isCategory ? name : id));
            }}
          >
            <ListItemIcon>
              <img
                src={genreIcons[name.toLowerCase()]}
                css={sideMenuCss.genreImages}
                height={30}
              />
            </ListItemIcon>
            <ListItemText primary={name} />
          </ListItemButton>
        </Link>
      ))}
    </>
  );
};
// 最適化の検討
export default memo(SideBarMenuList);
