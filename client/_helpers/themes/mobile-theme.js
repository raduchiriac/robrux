import { createMuiTheme } from '@material-ui/core/styles';

export const MobileTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    type: 'dark',
  },
});
