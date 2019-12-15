import { createMuiTheme } from '@material-ui/core/styles';
import COLOR_PALETTE from '~/lib/constants/COLOR_PALETTE';

// TODO: Make this dynamic somehow
import { roRO } from '@material-ui/core/locale';

export const DefaultTheme = createMuiTheme(
  {
    typography: {
      useNextVariants: true,
    },
    palette: {
      type: 'light',
    },
    custom_palette: COLOR_PALETTE,
  },
  roRO
);
