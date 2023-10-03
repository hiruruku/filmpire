import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { useTheme, Theme } from '@mui/material/styles';
import { GenresResponse } from '../../api/types/tmdb';
import genreIcons from '../../assets/genres';

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

const SideBarMenuList: React.FC<SideBarMenuList> = ({ displayArray }) => {
  const theme = useTheme();
  const sideMenuCss = getSideMenuCss(theme);
  return (
    <>
      {displayArray.genres.map(({ name }) => (
        <Link
          key={name}
          css={sideMenuCss.links}
          to="/"
        >
          <ListItemButton onClick={() => {}}>
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

export default SideBarMenuList;
