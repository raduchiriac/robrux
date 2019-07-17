import { createMuiTheme } from '@material-ui/core/styles';

export const DarkTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    type: 'dark',
  },
});
