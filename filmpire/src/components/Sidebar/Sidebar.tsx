import { Box, CircularProgress, Divider, List, ListSubheader } from '@mui/material';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { useTheme } from '@mui/material/styles';
import SideBarMenuList from './SideBarMenuList';

import { useGetGenresQuery } from '../../api/tmdb';

const sideBarCss = {
  imageLink: css`
    display: flex;
    justify-content: center;
    padding: 10% 0;
  `,
  image: css`
    width: 70%;
  `,
};

const categories = {
  genres: [
    { id: 101, name: 'popular' },
    { id: 102, name: 'top rated' },
    { id: 103, name: 'upcoming' },
  ],
};

const redLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const blueLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

type SidebarProps = {
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar: React.FC<SidebarProps> = ({ setMobileOpen }) => {
  const theme = useTheme();
  const { data, isFetching } = useGetGenresQuery();

  return (
    <>
      <Link
        to="/"
        css={sideBarCss.imageLink}
      >
        <img
          css={sideBarCss.image}
          src={theme.palette.mode === 'light' ? redLogo : blueLogo}
          alt="Filmpire logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        <SideBarMenuList displayArray={categories} />
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box
            display="flex"
            justifyContent="center"
          >
            <CircularProgress size="4rem" />
          </Box>
        ) : (
          data && <SideBarMenuList displayArray={data} />
        )}
      </List>
    </>
  );
};

export default Sidebar;
