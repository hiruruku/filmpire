import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useTheme, Theme } from '@mui/material/styles';
import { css } from '@emotion/react';

type MovieLinkCssReturnType = {
  links: ReturnType<typeof css>;
  image: ReturnType<typeof css>;
};
const getMovieLinkCss = (theme: Theme): MovieLinkCssReturnType => ({
  links: css`
    align-items: center;
    font-weight: bolder;
    text-decoration: none;
    ${theme.breakpoints.up('xs')} {
      display: flex;
      flex-direction: column;
    }
    &:hover {
      cursor: pointer;
      text-decoration: none;
    }
  `,
  image: css`
    border-radius: 20px;
    height: 300px;
    margin-bottom: 10px;
    transition: transform 0.3s ease;
    &:hover {
      transform: scale(1.05);
    }
  `,
});

type MovieLinkProps = {
  movieId: number;
  posterPath: string | null;
  title: string;
  children: ReactNode;
};

const MovieLink: React.FC<MovieLinkProps> = ({ movieId, posterPath, title, children }) => {
  const theme = useTheme();
  const movieLinkCss = getMovieLinkCss(theme);
  const imageUrl = posterPath ? `${import.meta.env.VITE_TMDB_IMAGE_URL}${posterPath}` : import.meta.env.VITE_DEFAULT_IMAGE_URL;

  return (
    <Link
      css={movieLinkCss.links}
      to={`/movie/${movieId}`}
    >
      <img
        css={movieLinkCss.image}
        src={imageUrl}
        alt={title}
      />
      {children}
    </Link>
  );
};
export default MovieLink;
