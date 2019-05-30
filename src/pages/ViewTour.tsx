import { Link, Grid, Typography, IconButton, Icon } from "@material-ui/core";
import React, { useEffect, useState, useRef } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { Converter } from "showdown";
import { Stop, Tour, Index, WebRepository } from "../model";
import { Page, ViewTourPage } from "../pageTypes";
import axios from "axios";
import { Theme, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => {
  return {
    selectedLine: {
      backgroundColor: "yellow"
    }
  };
});

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
  const FONT_SIZE = 16;
  const LINE_HEIGHT = 1.2; // should be standard

  const [code, setCode] = useState("Loading...");
  const classes = useStyles();
  const codeView = useRef(null as HTMLDivElement | null);

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
          const elem = codeView.current;
          if (!elem) {
            return;
          }
          elem.scrollTo(
            0,
            Math.max(0, (props.stop.line - 5) * FONT_SIZE * LINE_HEIGHT)
          );
        });
    }
  }, [props.stop, repository]);

  return (
    <div
      ref={codeView}
      style={{
        overflow: "auto",
        position: "relative",
        maxHeight: "80vh",
        lineHeight: LINE_HEIGHT,
        fontSize: FONT_SIZE
      }}
    >
      <SyntaxHighlighter
        showLineNumbers
        customStyle={{
          margin: 0
        }}
        lineProps={(
          lineNumber: number
        ): React.HTMLAttributes<HTMLSpanElement> => {
          return lineNumber - 1 === props.stop.line
            ? { className: classes.selectedLine }
            : {};
        }}
        wrapLines={true}
        lineNumberStyle={(lineNumber: number): any => {
          return lineNumber - 1 === props.stop.line
            ? { fontWeight: "bold" }
            : {};
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
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
