import { createMuiTheme } from '@material-ui/core/styles';
import COLOR_PALETTE from '~/lib/constants/COLOR_PALETTE';

// TODO: Make this dynamic somehow
import { roRO } from '@material-ui/core/locale';

export const LightTheme = createMuiTheme(
  {
    typography: {
      useNextVariants: true,
      button: {
        // textTransform: 'none',
      },
    },
    // https://material-ui.com/customization/palette/
    palette: {
      primary: {
        // light: will be calculated from palette.primary.main,
        main: COLOR_PALETTE.primary,
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      error: {
        main: COLOR_PALETTE.error,
      },
      secondary: {
        main: COLOR_PALETTE.secondary,
      },
      type: 'light',
    },
    custom_palette: COLOR_PALETTE,
  },
  roRO
);
