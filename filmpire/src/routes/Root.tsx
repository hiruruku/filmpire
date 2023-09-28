import { CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
import { css } from '@emotion/react';

const rootCss = {
  root: css`
    display: flex;
    height: 100%;
  `,
  toolbar: css`
    height: 70px;
  `,
  content: css`
    flex-grow: 1;
    padding: 2em;
  `,
};

const Root = () => {
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
