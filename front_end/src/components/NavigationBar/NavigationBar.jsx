import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import navigationBarStyles from './NavigationStyles';
import { Link } from '@mui/material';
import ShoppingCartDrawer from '../ShoppingCart/ShoppingCartDrawer';


const NavigationBar = () => {
  const classes = navigationBarStyles();

  const pages = [
    {
      label: 'Mens',
      link: '/browse/male'
    },
    {
      label: 'Womans',
      link: '/browse/female'
    },
    {
      label: 'Kids',
      link: '/browse/kids'
    },
  ];
  // const settings = ['Profile', 'Account', 'Admin', 'Logout'];

  const settings = [
    {
      label: 'Profile',
      link: '/profile',
    },
    {
      label: 'Account',
      link: '/account',
    },
    {
      label: 'Admin',
      link: '/admin',
    },
  ];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  return (
    <AppBar position="relative" className={classes.appBar}>
      <Container maxWidth="xxl">
        <Toolbar disableGutters className={classes.toolBar}>
          <Box className={classes.menuButtonBox}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              className={classes.menuIcon}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                  <Link underline='none' href={page.link}>
                    <Typography textAlign="center">{page.label}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box className={classes.boxPages}>
            {pages.map((page) => (
              <Link underline='none' href={page.link}>
                <Button
                  key={page.label}
                  onClick={handleCloseNavMenu}
                  color='tertiary'
                >
                  {page.label}
                </Button>
              </Link>
            ))}
          </Box>

          <Box className={classes.boxTitle}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              className={classes.titleText}
            >
              FASHION
            </Typography>
          </Box>

          <Box>
            <ShoppingCartDrawer />
          </Box>

          <Box>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} >
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              className={classes.userMenu}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <Link underline='none' href={setting.link} >
                  <MenuItem key={setting.label} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting.label}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar >
  )
}

export default NavigationBar;