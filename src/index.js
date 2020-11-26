import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import Root from "./components/Root";
import * as theme from "./theme";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Lato:300,400&display=swap');

  html, body {
    margin: 0;
    padding: 0;
  }

  html, body, #app {
    height: 100%;
    width: 100%;
  }

  img {
    image-rendering: pixelated;
  }

  body {
    font-family: Lato;
    font-weight: 300;
  }
`;

render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Root />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById("app")
);
