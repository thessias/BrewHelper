import "@fontsource/roboto";
import { alpha, createTheme } from "@mui/material/styles";

export const color_primary_black = "#001219";
export const color_primary_dark_cyan = "#0A9396";
export const color_primary_vanilla = "#E9D8A6";
export const color_primary_gamboge = "#EE9B00";
export const color_primary_alloy_orange = "#CA6702";

export const color_secondary_midnight_green = "#005F73";
export const color_secondary_tiffany_blue = "#94D2BD";
export const color_secondary_rust = "#BB3E03";
export const color_secondary_rufous = "#AE2012";
export const color_secondary_auburn = "#9B2226";

export const color_white = "#FFFFFF";

export const color_vanilla_opacity65 = withOpacity65(color_primary_vanilla);
export const color_black_opacity65 = withOpacity65(color_primary_black);

export const font_weight_light = "300";
export const font_weight_regular = "400";
export const font_weight_semibold = "600";
export const font_weight_bold = "700";
export const font_weight_extrabold = "800";

export const border_radius = "4px";

export function withOpacity65(color: string) {
  return alpha(color, 0.65);
}

declare module "@mui/material/styles" {
  interface Palette {
    primary_black: Palette["primary"];
    primary_dark_cyan: Palette["primary"];
    primary_vanilla: Palette["primary"];
    primary_gamboge: Palette["primary"];
    primary_alloy_orange: Palette["primary"];

    secondary_midnight_green: Palette["primary"];
    secondary_tiffany_blue: Palette["primary"];
    secondary_rust: Palette["primary"];

    secondary_rufous: Palette["primary"];
    secondary_auburn: Palette["primary"];

    white: Palette["primary"];
    vanilla_opacity65: Palette["primary"];
  }
  interface PaletteOptions {
    primary_black: PaletteOptions["primary"];
    primary_dark_cyan: PaletteOptions["primary"];
    primary_vanilla: PaletteOptions["primary"];

    primary_gamboge: PaletteOptions["primary"];
    primary_alloy_orange: PaletteOptions["primary"];
    secondary_midnight_green: PaletteOptions["primary"];
    secondary_tiffany_blue: PaletteOptions["primary"];
    secondary_rust: PaletteOptions["primary"];

    secondary_rufous: PaletteOptions["primary"];
    secondary_auburn: PaletteOptions["primary"];
    white: PaletteOptions["primary"];
    vanilla_opacity65: PaletteOptions["primary"];
    black_opacity65: PaletteOptions["primary"];
  }
}
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    primary_dark_cyan: true;
    primary_gamboge: true;
    secondary_tiffany_blue: true;
    black_opacity65: true;
    primary_alloy_orange: true;
  }
}

declare module "@mui/material/SvgIcon" {
  interface SvgIconPropsColorOverrides {
    primary_black: true;
  }
}

declare module "@mui/material/FormControl" {
  interface FormControlColorOverrides {
    primary_dark_cyan: true;
    primary_gamboge: true;
  }
}
declare module "@mui/material/Stack" {
  interface StackPropsColorOverrides {
    primary_dark_cyan: true;
    primary_gamboge: true;
  }
}

export function createComponentsTheme() {
  return createTheme({
    palette: {
      primary: {
        main: color_primary_dark_cyan,
        contrastText: color_primary_dark_cyan,
      },
      primary_black: {
        main: color_primary_black,
        contrastText: color_primary_vanilla,
      },

      primary_vanilla: {
        main: color_primary_vanilla,
        contrastText: color_primary_dark_cyan,
      },
      vanilla_opacity65: {
        main: color_vanilla_opacity65,
        contrastText: color_primary_dark_cyan,
      },
      black_opacity65: {
        main: color_black_opacity65,
        contrastText: color_primary_vanilla,
      },

      primary_gamboge: {
        main: color_primary_gamboge,
        contrastText: color_secondary_midnight_green,
      },
      primary_alloy_orange: {
        main: color_primary_alloy_orange,
        contrastText: color_secondary_tiffany_blue,
      },
      primary_dark_cyan: {
        main: color_primary_dark_cyan,
        contrastText: color_secondary_rust,
      },
      secondary: {
        main: color_secondary_midnight_green,
        contrastText: color_primary_vanilla,
      },
      secondary_midnight_green: {
        main: color_secondary_midnight_green,
        contrastText: color_primary_vanilla,
      },
      secondary_tiffany_blue: {
        main: color_secondary_tiffany_blue,
        contrastText: color_secondary_rust,
      },
      secondary_rust: {
        main: color_secondary_rust,
        contrastText: color_secondary_tiffany_blue,
      },

      secondary_rufous: {
        main: color_secondary_rufous,
        contrastText: color_primary_black,
      },

      secondary_auburn: {
        main: color_secondary_auburn,
        contrastText: color_primary_vanilla,
      },

      error: {
        main: color_secondary_rufous,
      },
      warning: {
        main: color_primary_alloy_orange,
      },
      success: {
        main: color_primary_dark_cyan,
      },
      info: {
        main: color_primary_black,
      },

      white: {
        main: color_white,
        contrastText: color_primary_black,
      },
    },
    typography: {
      fontFamily: "Roboto",
      button: {
        textTransform: "none",
        fontWeight: font_weight_regular,
        lineHeight: "20px",
      },
      h1: {
        fontSize: "25px",
        color: color_primary_dark_cyan,
      },
      h2: {
        fontSize: "25px",
        color: color_primary_black,
      },
      h3: {
        fontSize: "23px",
        color: color_primary_black,
      },
      h4: {
        fontSize: "22px",
        color: color_primary_black,
      },
      h5: {
        fontSize: "18px",
        color: color_black_opacity65,
      },
      caption: {
        fontSize: "13px",
        color: color_secondary_rust,
      },
    },
    components: {
      MuiTypography: {
        defaultProps: {
          letterSpacing: "-0.03em",
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
          disableTouchRipple: true,
        },
        styleOverrides: {
          root: {
            minHeight: "40px",
          },
          sizeSmall: {
            minHeight: "32px",
            fontSize: "12px",
            lineHeight: "12px",
          },
        },
      },
    },
  });
}
