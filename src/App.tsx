import React, { useState, useEffect } from "react";
import "./styles/App.css";
import { UploadTour } from "./pages/UploadTour";
import { CreateIndex } from "./pages/CreateIndex";
import { ViewTour } from "./pages/ViewTour";
import { Page } from "./pageTypes";
import { Index, Tour, isTour, parseTour, parseIndex } from "./model";
import { AppBar, Toolbar, Button, Icon } from "@material-ui/core";

const App: React.FC<{ page?: Page }> = props => {
  const [page, setPage] = useState(
    props.page || ({ kind: "UploadTour" } as Page)
  );

  function startOver() {
    localStorage.clear();
    setPage({ kind: "UploadTour" });
  }

  function getSavedTour(): Tour | null {
    const tourString = localStorage.getItem("savedTour");
    if (!tourString) return null;
    const tour = parseTour(tourString);
    return isTour(tour) ? tour : null;
  }

  function getSavedIndex(): Index | null {
    const indexString = localStorage.getItem("savedIndex");
    if (!indexString) return null;
    const index = parseIndex(indexString);
    return typeof index === "string" ? null : index;
  }

  useEffect(() => {
    if (props.page) return; // don't overwrite hard-coded value
    const tour = getSavedTour();
    const index = getSavedIndex();
    if (tour) {
      if (index) {
        setPage({
          kind: "ViewTour",
          tour,
          context: { kind: "ResolveWithIndex", index }
        });
      } else {
        setPage({ kind: "CreateIndex", tour });
      }
    }
  }, [props.page]);

  let main;
  switch (page.kind) {
    case "UploadTour":
      main = <UploadTour page={page} route={setPage} />;
      break;
    case "CreateIndex":
      main = <CreateIndex page={page} route={setPage} />;
      break;
    case "ViewTour":
      main = <ViewTour page={page} route={setPage} />;
      break;
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          {page.kind !== "UploadTour" && (
            <Button onClick={startOver}>
              <Icon style={{ marginRight: 20 }}>refresh</Icon>
              Start Over
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {main}
    </div>
  );
};

export default App;
