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
        light: "#EDEDED",
        main: "#8b8d92",
        dark: "#6191A1",
      },
      secondary: {
        light: "#598C9C",
        main: "#CC0000",
        dark: "#FFDE00",
      },
    },
  },
  ptBR
);

export default MainTheme;
