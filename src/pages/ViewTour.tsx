import { Grid, Icon, IconButton, Link, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Converter } from "showdown";
import { CodeWindow } from "../components/CodeWindow";
import { Index, Stop, Tour, WebRepository } from "../model";
import { Page, ViewTourPage } from "../pageTypes";

export const RepositoryLink: React.FC<{
  repository: WebRepository;
  path: string;
  line: number;
}> = props => {
  const url =
    "https://github.com/" +
    props.repository.name +
    "/blob/master/" +
    props.path +
    "#L" +
    props.line;
  return (
    <Link href={url} style={{ float: "right" }}>
      View on GitHub
    </Link>
  );
};

export const StopProse: React.FC<{
  index: Index;
  tour: Tour;
  stop: Stop;
}> = props => {
  const stop = props.stop;

  const repository = props.index.get(props.stop.repository);

  const converter = new Converter();
  converter.setFlavor("github");
  const htmlBody = converter.makeHtml(stop.body);

  return (
    <div>
      <Typography variant="h3">{stop.title}</Typography>
      <div dangerouslySetInnerHTML={{ __html: htmlBody }} />
      {repository && (
        <RepositoryLink
          repository={repository}
          path={stop.relPath}
          line={stop.line}
        />
      )}
    </div>
  );
};

export const StopCode: React.FC<{
  index: Index;
  tour: Tour;
  stop: Stop;
}> = props => {
  const [code, setCode] = useState("Loading...");

  const repository = props.index.get(props.stop.repository);

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

  return <CodeWindow code={code} focusLine={props.stop.line} />;
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
      <Grid item md={4} xs={12} style={{ paddingRight: 60 }}>
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
