import * as React from "react";
import * as ReactDOM from "react-dom";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./components/App";
import * as Constants from "./utils/constants";
import "./styles.scss";

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={Constants.THEME_STYLE}>
      <>
        <CssBaseline />
        <App />
      </>
    </ThemeProvider>
  </StyledEngineProvider>,
  document.getElementById("root")
);
