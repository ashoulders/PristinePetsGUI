import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import { useRecoilState } from 'recoil';
import Customers from './customers/customers';
import Requests from './requests/requests';
import Website from './website/website';
import Calendar from './calendar/calendar';
import Templates from './templates/templates';
import { loginState } from '../utils/recoilStates';
import Dashboard from './dashboard/dashboard';

const pages = [
  'Calendar',
  'Customers',
  'Requests',
  'Templates',
  'Website',
  'Dashboard',
];
const pageContent = {
  Calendar: <Calendar />,
  Customers: <Customers />,
  Requests: <Requests />,
  Templates: <Templates />,
  Website: <Website />,
  Dashboard: <Dashboard />,
};

const Navbar = () => {
  const [anchorPages, setAnchorPages] = useState(null);
  const [currentPage, setCurrentPage] = useState('Calendar');
  const [login, setLogin] = useRecoilState(loginState);

  const handleOpenPagesMenu = (event) => {
    setAnchorPages(event.currentTarget);
  };

  const handleCloseNavMenu = (event) => {
    setAnchorPages(null);
    if (event.target.id) {
      setCurrentPage(event.target.id);
    }
  };

  const StyledAppBar = styled(AppBar)(() => ({
    backgroundColor: '#6ec6ff',
    color: '#000',
  }));

  const StyledButton = styled(Button)(() => ({
    color: '#000',
    boxShadow: 'none',
    backgroundColor: '#6ec6ff',
    '&:hover': {
      backgroundColor: '#1d87da',
    },
  }));

  return (
    <>
      <StyledAppBar position="fixed">
        <Container maxWidth="false">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenPagesMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorPages}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorPages)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} id={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <StyledButton
                  key={page}
                  id={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, display: 'block' }}
                >
                  {page}
                </StyledButton>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <StyledButton
                key="logout"
                onClick={() => setLogin(false)}
                sx={{ my: 2, display: 'block' }}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                Logout
              </StyledButton>
            </Box>
          </Toolbar>
        </Container>
      </StyledAppBar>
      <div className="mainDiv">{pageContent[currentPage]}</div>
    </>
  );
};
export default Navbar;
