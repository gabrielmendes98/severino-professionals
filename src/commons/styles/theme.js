import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7D3CFF',
    },
    secondary: {
      main: '#3700B3',
    },
    error: {
      main: '#F3474C',
    },
    common: {
      white: '#FFFFFF',
      light: '#FAFAFA',
      yellow: '#FFC744',
      red: '#F44336',
    },
    grey: {
      main: '#808285',
      dark: '#606060',
      light: '#9999',
      lighter: '#DDDDDD',
    },
  },
  shape: {
    borderCircle: 40,
  },
  typography: {
    useNextVariants: true,
    letterSpacing: 1,
    color: {
      primary: '#7D3CFF',
      secondary: '#3700B3',
      dark: '#000',
      main: '#363636',
      light: '#A48CAB',
    },
    fontFamily: 'Roboto',
    titleFontFamily: 'Ubuntu',
  },
});

export default theme;
