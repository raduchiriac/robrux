import { createMuiTheme } from '@material-ui/core/styles';
import COLOR_PALETTE from '../constants/COLOR_PALETTE';

export const DefaultTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    type: 'light',
  },
  custom_palette: COLOR_PALETTE,
});
