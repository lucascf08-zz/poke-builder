import { createTheme } from "@material-ui/core/styles";
import { ptBR } from "@material-ui/core/locale";
const MainTheme = createTheme(
  {
    typography: {
      fontFamily: "monospace",
      fontWeightRegular: 400,
    },
    palette: {
      mode: "light",
      primary: {
        light: "#eee",
        main: "#eee",
        dark: "#6191A1",
      },
      secondary: {
        light: "#598C9C",
        main: "#D33F49",
        dark: "#262730",
      },
    },
  },
  ptBR
);

export default MainTheme;
