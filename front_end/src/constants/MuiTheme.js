import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2F3037',
    },
    secondary: {
      main: '#DEECE8',
    },
    tertiary: {
      main: '#FFFFFF'
    },
    quaternary: {
      main: '#5B1414'
    },
    price: {
      main: '#FF0000'
    },
    adminOrange: {
      main: ' #F5761A'
    }
  },
  shape: {
    borderRadius: 20
  },
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: 'body2' },
          style: {
            fontWeight: 100,
            fontSize: '1.2rem'
          }
        }
      ]
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 25
        }
      }
    },
    MuiPaper: {
      variants: [
        {
          props: {
            variant: 'outlined'
          },
          style: {
            borderRadius: 25
          }
        }
      ]
    }
  },
});

export default theme;