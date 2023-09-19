import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme, Theme } from '@mui/material/styles';
import { css } from '@emotion/react';
import { useState } from 'react';

type NavCssReturnType = {
  toolbar: ReturnType<typeof css>;
  menuButton: ReturnType<typeof css>;
};

const getNavCss = (theme: Theme): NavCssReturnType => ({
  toolbar: css({
    height: '80px',
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: '240px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      flexWrap: 'wrap',
    },
  }),
  menuButton: css({
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  }),
});

const NavBar = () => {
  const theme = useTheme();
  const navCss = getNavCss(theme);
  const isMobile = useMediaQuery('(max-width:600px)');
  const [isAuthenticated, setAuthenticated] = useState(true);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar css={navCss.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: 'none' }}
              onClick={() => {}}
              css={navCss.menuButton}
            >
              <Menu />
            </IconButton>
          )}
          <IconButton
            color="inherit"
            sx={{ ml: 1 }}
            onClick={() => {}}
          >
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <div>
            {!isAuthenticated ? (
              <Button
                color="inherit"
                onClick={() => {}}
              >
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to={`/profile/:id`}
                // css={navCss.linkButton}
              >
                {!isMobile && <>My Movies &nbsp;</>}

                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="Profile"
                  src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                />
              </Button>
            )}
          </div>
          {isMobile && 'Search...'}
        </Toolbar>
      </AppBar>
    </>
  );
};
export default NavBar;
