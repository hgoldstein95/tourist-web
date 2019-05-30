import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#67daff",
      main: "#03a9f4",
      dark: "#007ac1",
      contrastText: "#fff"
    },
    secondary: {
      light: "#80e27e",
      main: "#4caf50",
      dark: "#087f23",
      contrastText: "#000"
    }
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App
      page={{
        kind: "ViewTour",
        tour: {
          title: "tourist-library",
          description: "A tour of the entire tourist library.",
          repositories: new Map([
            ["tourist", "a5837a902401225417849baaa78f25384e59d6d0"]
          ]),
          stops: [
            {
              body: "You can initialize a tour file with the `init` method.",
              line: 34,
              relPath: "src/tourist.ts",
              repository: "tourist",
              title: "The init Method"
            },
            {
              body:
                "Tour files can be manipulated with methods like `add`, `edit`, `move`, and `remove`.\n\nYay for tourist!",
              line: 68,
              relPath: "src/tourist.ts",
              repository: "tourist",
              title: "Manipulating a Tour File"
            },
            {
              body:
                "This document outlines what errors can be thrown and what they mean.",
              line: 1,
              relPath: "docs/error-handling.md",
              repository: "tourist",
              title: "Handling Errors"
            }
          ]
        },
        index: new Map([
          ["tourist", { provider: "github", name: "hgoldstein95/tourist" }]
        ])
      }}
    />
  </MuiThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
