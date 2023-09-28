import { CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
import { css } from '@emotion/react';
import { useTheme, Theme } from '@mui/material/styles';

type RootCssReturnType = {
  root: ReturnType<typeof css>;
  toolbar: ReturnType<typeof css>;
  content: ReturnType<typeof css>;
};
const getRootCss = (theme: Theme): RootCssReturnType => ({
  root: css`
    display: flex;
    height: 100%;
  `,
  toolbar: css`
    height: 80px;
  `,
  content: css`
    flex-grow: 1;
    padding: 2em;
    ${theme.breakpoints.up('sm')} {
      margin-left: 240px; // Drawerの幅分だけ左マージンを追加
    }
  `,
});

const Root = () => {
  const theme = useTheme();
  const rootCss = getRootCss(theme);
  return (
    <div css={rootCss.root}>
      <CssBaseline />
      <NavBar />
      <main css={rootCss.content}>
        <div css={rootCss.toolbar} />
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
