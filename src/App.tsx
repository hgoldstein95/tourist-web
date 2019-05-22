import React, { useState } from "react";
import "./styles/App.css";
import { UploadTour } from "./pages/UploadTour";
import { CreateIndex } from "./pages/CreateIndex";
import { ViewTour } from "./pages/ViewTour";
import { Page } from "./pageTypes";

const App: React.FC<{ page?: Page }> = props => {
  const [page, setPage] = useState(
    props.page || ({ kind: "UploadTour" } as Page)
  );

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

  return <div className="App">{main}</div>;
};

export default App;
