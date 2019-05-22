import React from "react";
import { UploadTourPage, Page } from "../pageTypes";
import Button from "@material-ui/core/Button";
import { Typography, Grid } from "@material-ui/core";

export const UploadTour: React.FC<{
  page: UploadTourPage;
  route: (s: Page) => void;
}> = () => {
  return (
    <Grid container spacing={16} justify="center">
      <Grid xs={12}>
        <Typography variant="h2">Upload Tour</Typography>
      </Grid>
      <Grid xs={12}>
        <Button
          variant="contained"
          /* TODO: Route
          onClick={() =>
            props.route({
              kind: "CreateIndex",
              tour: { title: "My First Tour" }
            })
          }
          */
        >
          Advance
        </Button>
      </Grid>
    </Grid>
  );
};
