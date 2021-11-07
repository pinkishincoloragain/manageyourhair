import { ThemeProvider } from "@material-ui/core";
import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import theme from "Components/theme";

render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  document.getElementById("root")
);
