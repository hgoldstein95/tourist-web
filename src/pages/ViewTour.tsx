import { Grid, Icon, IconButton, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { StopView } from "../components/StopView";
import { Page, ViewTourPage } from "../pageTypes";
import { Tour } from "../model";
import { Converter } from "showdown";

export const TitlePage: React.FC<{
  tour: Tour;
}> = props => {
  const converter = new Converter();
  converter.setFlavor("github");
  const htmlBody = converter.makeHtml(props.tour.description);

  return (
    <Grid container>
      <Grid item xs={12} style={{ textAlign: "center" }}>
        <Typography variant="h3">{props.tour.title}</Typography>
      </Grid>
      <Grid item xs={12} style={{ textAlign: "center" }}>
        <div
          dangerouslySetInnerHTML={{ __html: htmlBody }}
          style={{ marginTop: 50 }}
        />
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

  function setAndStoreIndex(idx: number) {
    setIndex(idx);
    localStorage.setItem("stopNumber", idx.toString());
  }

  function incIndex() {
    setAndStoreIndex(Math.min(stops.length, index + 1));
  }
  function decIndex() {
    setAndStoreIndex(Math.max(-1, index - 1));
  }

  const canGoForward = index < stops.length - 1;
  const canGoBack = index > -1;

  useEffect(() => {
    const idx = localStorage.getItem("stopNumber");
    if (!idx) return;
    setIndex(+idx);
  }, []);

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
            context={props.page.context}
            tour={props.page.tour}
            stop={stops[index]}
          />
        )}
      </Grid>
    </Grid>
  );
};
