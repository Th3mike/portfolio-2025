// theme.js

import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#9c4dcc',  // Roxo claro
    },
    background: {
      default: '#f3f4f6', // Cor de fundo clara
    },
    text: {
      primary: '#000000', // Preto para o texto no modo claro
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6200ea',  // Roxo escuro
    },
    background: {
      default: '#121212', // Cor de fundo escura
    },
    text: {
      primary: '#ffffff', // Branco para o texto no modo escuro
    },
  },
});

export { lightTheme, darkTheme };
