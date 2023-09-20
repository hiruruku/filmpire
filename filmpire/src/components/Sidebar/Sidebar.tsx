import { useEfffect } from 'react';
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgres, ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { useTheme } from '@mui/material/styles';
import SideBarMenuList from './SideBarMenuList';

const sideBarCss = {
  imageLink: css({
    display: 'flex',
    justifyContent: 'center',
    padding: '10% 0',
  }),
  image: css({
    width: '70%',
  }),
};

const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcomming', value: 'upcomming' },
];
const demoCategories = [
  { label: 'Comedy', value: 'comedy' },
  { label: 'Action', value: 'action' },
  { label: 'Horror', value: 'horror' },
  { label: 'Animation', value: 'animation' },
];
const redLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const blueLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

const Sidebar = ({ setMobileOpen }) => {
  const theme = useTheme();

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
        <SideBarMenuList displayArray={demoCategories} />
      </List>
    </>
  );
};

export default Sidebar;
