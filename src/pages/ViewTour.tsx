import { Grid, Icon, IconButton, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { StopView } from "../components/StopView";
import { Page, ViewTourPage } from "../pageTypes";
import { Tour } from "../model";

export const TitlePage: React.FC<{
  tour: Tour;
}> = props => {
  return (
    <Grid container>
      <Grid item xs={12} style={{ textAlign: "center" }}>
        <Typography variant="h3">{props.tour.title}</Typography>
      </Grid>
      <Grid item xs={12} style={{ textAlign: "center" }}>
        <p style={{ marginTop: 50 }}>{props.tour.description}</p>
      </Grid>
    </Grid>
  );
};

export const ViewTour: React.FC<{
  page: ViewTourPage;
  route: (s: Page) => void;
}> = props => {
  const stops = props.page.tour.stops;
  const [index, setIndex] = useState(-1); // -1 means the title page

  function incIndex() {
    setIndex(Math.min(stops.length, index + 1));
  }
  function decIndex() {
    setIndex(Math.max(-1, index - 1));
  }

  const canGoForward = index < stops.length - 1;
  const canGoBack = index > -1;

  return (
    <Grid
      container
      style={{ paddingTop: 20, paddingLeft: 60, paddingRight: 60 }}
    >
      <Grid item xs={12} style={{ marginBottom: 20 }}>
        <IconButton onClick={decIndex} disabled={!canGoBack}>
          <Icon>arrow_back</Icon>
        </IconButton>
        <IconButton
          onClick={incIndex}
          disabled={!canGoForward}
          style={{ float: "right" }}
        >
          <Icon>arrow_forward</Icon>
        </IconButton>
      </Grid>
      <Grid item xs={12}>
        {index === -1 ? (
          <TitlePage tour={props.page.tour} />
        ) : (
          <StopView
            index={props.page.index}
            tour={props.page.tour}
            stop={stops[index]}
          />
        )}
      </Grid>
    </Grid>
  );
};
