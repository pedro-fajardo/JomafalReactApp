import { Link } from "react-router-dom";
import { useState } from "react";
import { AppBar, Toolbar, Box, Button, IconButton, Typography, Menu, MenuItem, Container } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function TopBar({ selectedTab, setSelectedTab }) {
   const [anchorElNav, setAnchorElNav] = useState(null);

   const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
   };

   const handleCloseNavMenu = () => {
      setAnchorElNav(null);
   };

   const handleNavClick = (tab) => {
      setSelectedTab(tab);
      handleCloseNavMenu();
   };

   return (
      <AppBar position="static" sx={{
         background: 'linear-gradient(90deg, #2E5077 0%, #5B85AA 100%)',
         boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
      }}>
         <Container maxWidth="xl">
            <Toolbar disableGutters>
               {/* Logo and title for larger screens */}
               <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                  <Box
                     sx={{
                        height: 40,
                        width: 40,
                        bgcolor: 'white',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                        mr: 1.5
                     }}
                  >
                     <Typography variant="h6" fontWeight="bold" color="#2E5077">A</Typography>
                  </Box>
                  <Typography
                     variant="h6"
                     noWrap
                     sx={{
                        fontWeight: 700,
                        color: 'white',
                        textDecoration: 'none',
                        display: { xs: 'none', md: 'flex' },
                     }}
                  >
                     ASJ
                  </Typography>
               </Link>

               {/* Mobile menu */}
               <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'space-between' }}>
                  <IconButton
                     size="large"
                     aria-controls="menu-appbar"
                     aria-haspopup="true"
                     onClick={handleOpenNavMenu}
                     color="inherit"
                  >
                     <MenuIcon />
                  </IconButton>
                  <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                     <Typography
                        variant="h6"
                        noWrap
                        sx={{
                           fontWeight: 700,
                           color: 'white',
                           textDecoration: 'none',
                           display: { xs: 'flex', md: 'none' },
                        }}
                     >
                        ASJ
                     </Typography>
                  </Link>
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
                     sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiPaper-root': {
                           borderRadius: 2,
                           boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
                        }
                     }}
                  >
                     <MenuItem
                        onClick={() => handleNavClick("equipments")}
                        selected={selectedTab === "equipments"}
                        sx={{
                           minWidth: 200,
                           '&.Mui-selected': {
                              backgroundColor: 'rgba(91, 133, 170, 0.1)',
                              color: '#2E5077',
                              fontWeight: 500
                           }
                        }}
                     >
                        <Typography textAlign="center">Equipamentos</Typography>
                     </MenuItem>
                     <MenuItem
                        onClick={() => handleNavClick("clients")}
                        selected={selectedTab === "clients"}
                        sx={{
                           minWidth: 200,
                           '&.Mui-selected': {
                              backgroundColor: 'rgba(91, 133, 170, 0.1)',
                              color: '#2E5077',
                              fontWeight: 500
                           }
                        }}
                     >
                        <Typography textAlign="center">Clientes</Typography>
                     </MenuItem>
                  </Menu>
               </Box>

               {/* Desktop menu */}
               <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
                  <Button
                     component={Link}
                     to="/"
                     onClick={() => setSelectedTab("equipments")}
                     sx={{
                        my: 2,
                        px: 3,
                        py: 1,
                        mx: 1,
                        color: selectedTab === "equipments" ? '#2E5077' : 'white',
                        backgroundColor: selectedTab === "equipments" ? 'white' : 'transparent',
                        boxShadow: selectedTab === "equipments" ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none',
                        borderRadius: 1,
                        fontWeight: 'medium',
                        '&:hover': {
                           backgroundColor: selectedTab === "equipments" ? 'white' : 'rgba(255, 255, 255, 0.2)',
                        },
                     }}
                  >
                     Equipamentos
                  </Button>
                  <Button
                     component={Link}
                     to="/clients"
                     onClick={() => setSelectedTab("clients")}
                     sx={{
                        my: 2,
                        px: 3,
                        py: 1,
                        mx: 1,
                        color: selectedTab === "clients" ? '#2E5077' : 'white',
                        backgroundColor: selectedTab === "clients" ? 'white' : 'transparent',
                        boxShadow: selectedTab === "clients" ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none',
                        borderRadius: 1,
                        fontWeight: 'medium',
                        '&:hover': {
                           backgroundColor: selectedTab === "clients" ? 'white' : 'rgba(255, 255, 255, 0.2)',
                        },
                     }}
                  >
                     Clientes
                  </Button>
               </Box>
            </Toolbar>
         </Container>
      </AppBar>
   );
}

export default TopBar;
