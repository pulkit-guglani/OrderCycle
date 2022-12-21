import { createMuiTheme } from "@mui/material";
import { createTheme } from "@mui/system";

export const themeOptions = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#7E57C2",
      light: "#a784e9",
      dark: "#512DA8",
    },
    secondary: {
      main: "#EDE7F6",
      light: "#cbb9ed",
    },
    background: {},
  },
});
