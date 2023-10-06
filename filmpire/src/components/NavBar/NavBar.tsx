import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme, Theme } from '@mui/material/styles';
import { css } from '@emotion/react';
import { useCallback, useState } from 'react';
import { Sidebar, Search } from '../exports';

type NavCssReturnType = {
  toolbar: ReturnType<typeof css>;
  menuButton: ReturnType<typeof css>;
  drawer: ReturnType<typeof css>;
  drawerPaper: ReturnType<typeof css>;
  linkButton: ReturnType<typeof css>;
};
const drawerWidth = 240;
const getNavCss = (theme: Theme): NavCssReturnType => ({
  toolbar: css`
    height: 80px;
    display: flex;
    justify-content: space-between;
    margin-left: 240px;
    ${theme.breakpoints.down('sm')} {
      margin-left: 0;
      flex-wrap: wrap;
    }
  `,
  menuButton: css`
    margin-right: ${theme.spacing(2)};
    ${theme.breakpoints.up('sm')} {
      display: none;
    }
  `,
  drawer: css`
    ${theme.breakpoints.up('sm')} {
      width: ${drawerWidth};
      flex-shrink: 0;
    }
  `,
  drawerPaper: css`
    width: ${drawerWidth};
  `,
  linkButton: css`
    &:hover {
      color: white !important;
      text-decoration: none;
    }
  `,
});

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const navCss = getNavCss(theme);
  const isMobile = useMediaQuery('(max-width:600px)');
  const isAuthenticated = true;
  const handleSetMobileOpen = useCallback(() => {
    setMobileOpen((prevMobileOpen) => !prevMobileOpen);
  }, []);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar css={navCss.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: 'none' }}
              onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
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
          {!isMobile && <Search />}
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
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <nav css={navCss.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              // classesで特定要素のstyleをoverride
              classes={{ paper: navCss.drawerPaper.toString() }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={handleSetMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              classes={{ paper: navCss.drawerPaper.toString() }}
              variant="permanent"
              open
            >
              <Sidebar setMobileOpen={handleSetMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
};
export default NavBar;
