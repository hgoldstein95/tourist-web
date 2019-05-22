import { Button, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { Converter } from "showdown";
import { Stop, Tour, Index } from "../model";
import { Page, ViewTourPage } from "../pageTypes";
import axios from "axios";

export const StopProse: React.FC<{
  index: Index;
  tour: Tour;
  stop: Stop;
}> = props => {
  const stop = props.stop;

  const converter = new Converter();
  const htmlBody = converter.makeHtml(stop.body);

  return (
    <div>
      <Typography variant="h3">{stop.title}</Typography>
      <div dangerouslySetInnerHTML={{ __html: htmlBody }} />
    </div>
  );
};

export const StopCode: React.FC<{
  index: Index;
  tour: Tour;
  stop: Stop;
}> = props => {
  const [code, setCode] = useState("Loading...");

  const repository = props.index[props.stop.repository];

  useEffect(() => {
    if (!repository) {
      setCode("Repository was not mapped in the index.");
    } else {
      axios
        .get(
          "https://raw.githubusercontent.com/" +
            repository.name +
            "/master/" +
            props.stop.relPath
        )
        .then(res => {
          setCode(res.data);
        });
    }
  }, [props.stop, repository]);

  return (
    <SyntaxHighlighter
      showLineNumbers
      customStyle={{
        margin: 0,
        maxHeight: "80vh"
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
};

export const ViewTour: React.FC<{
  page: ViewTourPage;
  route: (s: Page) => void;
}> = props => {
  const stops = props.page.tour.stops;
  const [index, setIndex] = useState(0);

  function incIndex() {
    setIndex((index + 1) % stops.length);
  }
  function decIndex() {
    setIndex(Math.max(0, index - 1));
  }

  const canGoForward = index < stops.length - 1;
  const canGoBack = index > 0;
  const stop = stops[index];

  return (
    <Grid
      container
      style={{ paddingTop: 20, paddingLeft: 60, paddingRight: 60 }}
    >
      <Grid item xs={12} style={{ marginBottom: 20 }}>
        <Button onClick={decIndex} disabled={!canGoBack}>
          Back
        </Button>
        <Button
          onClick={incIndex}
          disabled={!canGoForward}
          style={{ float: "right" }}
        >
          Forward
        </Button>
      </Grid>
      <Grid item md={4} xs={12}>
        <StopProse
          index={props.page.index}
          tour={props.page.tour}
          stop={stop}
        />
      </Grid>
      <Grid item md={8} xs={12}>
        <StopCode index={props.page.index} tour={props.page.tour} stop={stop} />
      </Grid>
    </Grid>
  );
};
