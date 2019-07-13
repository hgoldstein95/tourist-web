import { Grid, Link, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Converter } from "showdown";
import { CodeWindow } from "../components/CodeWindow";
import { Stop, Tour, WebRepository } from "../model";
import { Context } from "../pageTypes";

function buildCodeLinkURL(
  repository: WebRepository,
  path: string,
  commit: string,
  line: number
): string {
  switch (repository.provider) {
    case "github":
      return (
        "https://github.com/" +
        repository.name +
        "/blob/" +
        commit +
        "/" +
        path +
        "#L" +
        line
      );
    case "gitlab":
      return (
        "https://gitlab.com/" +
        repository.name +
        "/blob/" +
        commit +
        "/" +
        path +
        "#L" +
        line
      );
  }
}

function buildCodeSourceURL(
  repository: WebRepository,
  path: string,
  commit: string
): string {
  switch (repository.provider) {
    case "github":
      return (
        "https://raw.githubusercontent.com/" +
        repository.name +
        "/" +
        commit +
        "/" +
        path
      );
    case "gitlab":
      return (
        "https://gitlab.com/api/v4/projects/" +
        repository.project +
        "/repository/files/" +
        path +
        "/raw?ref=" +
        commit
      );
  }
}

export const RepositoryLink: React.FC<{
  repository: WebRepository;
  path: string;
  commit: string;
  line: number;
}> = props => {
  const url = buildCodeLinkURL(
    props.repository,
    props.path,
    props.commit,
    props.line
  );
  return (
    <Link href={url} style={{ float: "right" }}>
      View on {props.repository.provider === "github" ? "GitHub" : "GitLab"}
    </Link>
  );
};

export const StopProse: React.FC<{
  context: Context;
  tour: Tour;
  stop: Stop;
}> = props => {
  const stop = props.stop;

  const repository =
    props.context.kind === "ResolveWithIndex"
      ? props.context.index.get(props.stop.repository)
      : null;

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
          commit={props.tour.repositories.get(stop.repository) || "master"}
          line={stop.line}
        />
      )}
    </div>
  );
};

export const StopCode: React.FC<{
  context: Context;
  tour: Tour;
  stop: Stop;
}> = props => {
  const [code, setCode] = useState("Loading...");

  useEffect(() => {
    switch (props.context.kind) {
      case "LocalPackage": {
        setCode(
          props.context.content.get(
            props.stop.repository + "/" + props.stop.relPath
          ) || "No content available in package."
        );
        break;
      }
      case "ResolveWithIndex": {
        const repository = props.context.index.get(props.stop.repository);

        if (!repository) {
          setCode("Repository was not mapped in the index.");
        } else {
          axios
            .get(
              buildCodeSourceURL(
                repository,
                props.stop.relPath,
                props.tour.repositories.get(props.stop.repository) || "master"
              )
            )
            .then(res => {
              setCode(res.data);
            });
        }
        break;
      }
    }
  }, [props.stop, props.tour, props.context]);

  return <CodeWindow code={code} focusLine={props.stop.line} />;
};

export const StopView: React.FC<{
  context: Context;
  tour: Tour;
  stop: Stop;
}> = props => {
  return (
    <Grid container>
      <Grid item md={4} xs={12} style={{ paddingRight: 60 }}>
        <StopProse
          context={props.context}
          tour={props.tour}
          stop={props.stop}
        />
      </Grid>
      <Grid item md={8} xs={12}>
        <StopCode context={props.context} tour={props.tour} stop={props.stop} />
      </Grid>
    </Grid>
  );
};
