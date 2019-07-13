import { Button, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { ErrorSnackbar } from "../components/ErrorSnackbar";
import { WebRepositoryEditor } from "../components/WebRepositoryEditor";
import { WebRepository, writeIndex } from "../model";
import { CreateIndexPage, Page } from "../pageTypes";

export const CreateIndex: React.FC<{
  page: CreateIndexPage;
  route: (s: Page) => void;
}> = props => {
  const tour = props.page.tour;
  const [webRepositories, setWebRepositories] = useState(
    new Map<string, WebRepository>(
      Array.from(tour.repositories.keys()).map(k => [
        k,
        { provider: "github", name: "" }
      ])
    )
  );
  const [error, setError] = useState(null as string | null);

  function setWebRepository(repository: string, wr: WebRepository) {
    const wrs = new Map(webRepositories);
    wrs.set(repository, wr);
    setWebRepositories(wrs);
  }

  function finalize() {
    if (
      Array.from(webRepositories.entries()).some(
        ([_, webRepo]) =>
          webRepo.name === "" ||
          (webRepo.provider === "gitlab" && !webRepo.project)
      )
    ) {
      setError("You must set a mapping for every repository.");
      return;
    }
    localStorage.setItem("savedIndex", writeIndex(webRepositories));
    props.route({
      kind: "ViewTour",
      tour: props.page.tour,
      context: { kind: "ResolveWithIndex", index: webRepositories }
    });
  }

  return (
    <div>
      <Grid
        container
        style={{ marginTop: "10%" }}
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12} md={6}>
          <Grid container>
            <Grid item xs={12} style={{ marginBottom: 30 }}>
              <Typography variant="h4">{tour.title}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                {Array.from(tour.repositories.keys()).map((repository, i) => (
                  <WebRepositoryEditor
                    repoName={repository}
                    repository={webRepositories.get(repository)!}
                    onChange={wr => setWebRepository(repository, wr)}
                    key={repository}
                    first={i === 0}
                  />
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} style={{ textAlign: "right", marginTop: 50 }}>
              <Button onClick={finalize} color="primary" variant="outlined">
                Start Tour
              </Button>
            </Grid>
          </Grid>
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
