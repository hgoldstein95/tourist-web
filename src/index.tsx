import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
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
          repositories: new Map(),
          stops: [
            {
              title: "First Stop",
              body: "A *really* cool tour stop.",
              line: 35,
              relPath: "src/tourist.ts",
              repository: "tourist"
            },
            {
              title: "Second Stop",
              body: "Another super cool stop. This time with `code`!",
              line: 10,
              relPath: "index.ts",
              repository: "tourist"
            }
          ],
          title: "My First Tour",
          description: "A tour."
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
