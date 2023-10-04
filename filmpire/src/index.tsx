import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './routes/Root.tsx';
import { Actors, MovieInformation, Movies, Profile } from './routes/exports.ts';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import store from './store';

const theme = createTheme({});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Movies />,
      },
      {
        path: '/movie/:id',
        element: <MovieInformation />,
      },
      {
        path: '/actors/:id',
        element: <Actors />,
      },
      {
        path: '/profile/:id',
        element: <Profile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
