import * as React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { store } from "./store/store";
import { Provider } from "react-redux";
import GlobalStyle from "./global.styles";
//theme
import MainTheme from "./theme";
import { StyledEngineProvider, ThemeProvider } from "@material-ui/core/styles";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={MainTheme}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  </React.StrictMode>,

  document.getElementById("root")
);
