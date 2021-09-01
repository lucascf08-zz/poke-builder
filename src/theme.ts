import { createTheme } from "@material-ui/core/styles";
import { ptBR } from "@material-ui/core/locale";
const MainTheme = createTheme(
  {
    typography: {
      fontFamily: "monospace",
      fontWeightRegular: 400,
    },
    palette: {
      primary: {
        light: "#eee",
        main: "#EFF0D1",
        dark: "#6191A1",
      },
      secondary: {
        light: "#598C9C",
        main: "#D33F49",
        dark: "#598C9C",
      },
    },
  },
  ptBR
);

export default MainTheme;
