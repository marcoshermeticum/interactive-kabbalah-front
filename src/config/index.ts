import { createTheme } from '@mui/material';

export const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0c0a13',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#0052cc',
    },
    secondary: {
      main: '#424242',
    },
  },
});
