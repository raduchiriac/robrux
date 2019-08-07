import { createMuiTheme } from '@material-ui/core/styles';
import COLOR_PALETTE from '../constants/COLOR_PALETTE';

export const MobileTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    type: 'dark',
  },
  custom_palette: COLOR_PALETTE,
});
