import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Box, Button, Divider, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LanguageIcon from '@mui/icons-material/Language';
import Brightness7Icon from '@mui/icons-material/Brightness7';  // Ícone para Light Mode
import Brightness4Icon from '@mui/icons-material/Brightness4';  // Ícone para Dark Mode
import { Link } from 'react-router-dom';
import Flag from 'react-world-flags';
import { useTranslation } from 'react-i18next'; // Importa o hook useTranslation

const Header = ({ toggleTheme, isDarkMode, changeLanguage }) => {
  const { t, i18n } = useTranslation(); // Usa o hook useTranslation
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Persistência do idioma no localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLanguageMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = (lang) => {
    i18n.changeLanguage(lang); // Altera o idioma com o i18n
    localStorage.setItem('language', lang); // Salva a linguagem no localStorage
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="sticky" sx={{ boxShadow: 3, background: '#111' }}>
        <Toolbar sx={{ justifyContent: 'space-between', padding: '0 2rem' }}>
          {/* Ícone de Menu (Hamburguer) */}
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ display: { xs: 'block', sm: 'none' }, transition: 'transform 0.3s' }}>
            <MenuIcon />
          </IconButton>

          {/* Título */}
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', letterSpacing: 1.5, fontSize: '1.8rem' }}>
            Marcio Lacerda
          </Typography>

          {/* Botões para alternar o tema e a linguagem */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              color="inherit"
              onClick={toggleTheme}
              sx={{
                borderRadius: '30px',
                textTransform: 'capitalize',
                padding: '0.6rem 1.2rem',
                transition: 'none', // Desativa qualquer transição
                backgroundColor: 'transparent', // Garante que o fundo seja transparente
                '&:hover': { 
                  backgroundColor: 'transparent', // Remove qualquer efeito de cor no hover
                },
                '&:focus': {
                  outline: 'none', // Remove o contorno de foco
                },
              }}
            >
              {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              {isDarkMode ? t('lightMode') : t('darkMode')}
            </Button>

            {/* Dropdown de idioma */}
            <Button
              color="inherit"
              onClick={handleLanguageMenuClick}
              sx={{
                borderRadius: '30px',
                textTransform: 'capitalize',
                padding: '0.6rem 1.2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <LanguageIcon />
              <Typography variant="body1" sx={{ textTransform: 'none' }}>
                {isMobile ? t('language') : t('language')}
              </Typography>
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => handleLanguageMenuClose('pt')}>
                <Flag code="BR" style={{ width: 20, height: 20, marginRight: 8 }} />
                Português
              </MenuItem>
              <MenuItem onClick={() => handleLanguageMenuClose('en')}>
                <Flag code="US" style={{ width: 20, height: 20, marginRight: 8 }} />
                English
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer para o menu lateral */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: 260,
            backgroundColor: '#222',
            color: 'white',
            boxSizing: 'border-box',
            transition: 'transform 0.3s ease',
            transform: drawerOpen ? 'translateX(0)' : 'translateX(-100%)',
          },
        }}
      >
        <Box sx={{ width: '100%', padding: 2 }}>
          <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: 2, fontWeight: 'bold', letterSpacing: 1.5 }}>
            Menu
          </Typography>
          <Divider sx={{ marginBottom: 2, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />

          {/* Lista de navegação */}
          <List>
            <ListItem button component={Link} to="/" sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' }, borderRadius: '10px' }}>
              <ListItemIcon sx={{ color: 'white' }}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={t('home')} sx={{ color: 'white' }} />
            </ListItem>

            <ListItem button component={Link} to="/projects" sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' }, borderRadius: '10px' }}>
              <ListItemIcon sx={{ color: 'white' }}>
                <WorkIcon />
              </ListItemIcon>
              <ListItemText primary={t('projects')} sx={{ color: 'white' }} />
            </ListItem>

            <ListItem button component={Link} to="/contact" sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' }, borderRadius: '10px' }}>
              <ListItemIcon sx={{ color: 'white' }}>
                <ContactMailIcon />
              </ListItemIcon>
              <ListItemText primary={t('contact')} sx={{ color: 'white' }} />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
