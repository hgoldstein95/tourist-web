import React, { useState } from "react";
import { UploadTourPage, Page } from "../pageTypes";
import { Typography, Grid, Button } from "@material-ui/core";
import { ErrorSnackbar } from "../components/ErrorSnackbar";
import { parseTour, writeTour } from "../model";

export const UploadTour: React.FC<{
  page: UploadTourPage;
  route: (s: Page) => void;
}> = props => {
  const [error, setError] = useState(null as string | null);

  function uploadTour(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files![0];

    const fr = new FileReader();
    fr.readAsText(file);
    fr.onload = loaded => {
      const json = (loaded.target as any).result;
      const tour = parseTour(json);
      if (typeof tour == "string") {
        setError(tour);
        return;
      }
      localStorage.setItem("savedTour", writeTour(tour));
      props.route({
        kind: "CreateIndex",
        tour
      });
    };
  }

  return (
    <div>
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ marginTop: "10%" }}
      >
        <Grid item xs={7} style={{ textAlign: "center" }}>
          <Typography variant="h3" style={{ marginBottom: 20 }}>
            Welcome to Tourist!
          </Typography>
          <p>
            Tourist is a new approach to documentation that allows programmers
            to explain low-level technical details of a system while
            simultaneously providing the context of how those details fit into
            the broader architecture. It lets programmers document code in the
            same way that they would explain it in person: by walking the
            consumer step-by-step through the important parts of a codebase.
          </p>
          <Button
            style={{ marginTop: 80 }}
            color="primary"
            variant="outlined"
            component="label"
          >
            Upload a Tour
            <input
              type="file"
              style={{ display: "none" }}
              onInput={uploadTour}
            />
          </Button>
        </Grid>
      </Grid>
      <ErrorSnackbar
        show={error !== null}
        hideError={() => setError(null)}
        message={error || undefined}
      />
    </div>
  );
};
