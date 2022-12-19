import { createMuiTheme } from "@mui/material";
import { createTheme } from "@mui/system";

export const themeOptions = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#FFB300",
      light: "#FFC107",
      dark: "#FF8F00",
    },
    secondary: {
      main: "#FFDB89",
    },
    background: {},
  },
});
