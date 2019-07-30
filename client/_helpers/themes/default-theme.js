import { createMuiTheme } from '@material-ui/core/styles';

export const DefaultTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    type: 'light',
  },
});
