import { ListItemButton, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { useTheme, Theme } from '@mui/material/styles';

type SideMenuCssReturnType = {
  links: ReturnType<typeof css>;
  genreImage: ReturnType<typeof css>;
};

const getSideMenuCss = (theme: Theme): SideMenuCssReturnType => ({
  links: css`
    color: ${theme.palette.text.primary};
    text-decoration: none;
  `,
  genreImage: css`
    filter: ${theme.palette.mode === 'dark' ? 'dark' : 'invert(1)'};
  `,
});

type SideBarMenuList = {
  displayArray: { label: string; value: string }[];
};

const SideBarMenuList: React.FC<SideBarMenuList> = ({ displayArray }) => {
  const theme = useTheme();
  const sideMenuCss = getSideMenuCss(theme);
  return (
    <>
      {displayArray.map(({ label, value }) => (
        <Link
          key={value}
          css={sideMenuCss.links}
          to="/"
        >
          <ListItemButton onClick={() => {}}>
            {/* <ListItemIcon>
              <img
                src={redLogo}
                css={sideMenuCss.genreImages}
                height={30}
              />
            </ListItemIcon> */}
            <ListItemText primary={label} />
          </ListItemButton>
        </Link>
      ))}
    </>
  );
};

export default SideBarMenuList;
