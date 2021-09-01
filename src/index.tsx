import * as React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { store } from "./store/store";
import { Provider } from "react-redux";

//theme
import MainTheme from "./theme";
import { ThemeProvider } from "@material-ui/core/styles";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={MainTheme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,

  document.getElementById("root")
);
