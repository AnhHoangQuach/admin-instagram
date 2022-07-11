import { createTheme, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/lab';
import { default as DateAdapter } from '@mui/lab/AdapterLuxon';

export const appTheme = createTheme({
  typography: {
    fontFamily: `Open Sans, Roboto`,
  },
  palette: {
    primary: {
      light: '#8bc34a',
      main: '#8bc34a',
      dark: '#9ccc65',
    },
    secondary: {
      light: '#9575cd',
      main: '#7e57c2',
      dark: '#673ab7',
    },
  },
});

const Theme = ({ children }: any) => {
  return (
    <ThemeProvider theme={appTheme}>
      <LocalizationProvider dateAdapter={DateAdapter}>{children}</LocalizationProvider>
    </ThemeProvider>
  );
};

export default Theme;
