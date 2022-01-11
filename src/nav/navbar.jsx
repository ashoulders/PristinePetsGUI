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
import PetsCalendar from './calendar/calendar';
import CustomerList from './customers/customerList';

const pages = ['Calendar', 'Customers', 'Requests', 'Website', 'Dashboard'];
const pageContent = { Calendar: <PetsCalendar />, Customers: <CustomerList /> };

const Navbar = () => {
  const [anchorPages, setAnchorPages] = useState(null);
  const [currentPage, setCurrentPage] = useState('Calendar');

  const handleOpenPagesMenu = (event) => {
    setAnchorPages(event.currentTarget);
  };

  const handleCloseNavMenu = (event) => {
    setAnchorPages(null);
    if (event.target.id) {
      setCurrentPage(event.target.id);
    }
  };

  const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    color: '#000',
  }));

  const StyledButton = styled(Button)(() => ({
    color: '#000',
    boxShadow: 'none',
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
                onClick={handleCloseNavMenu}
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
