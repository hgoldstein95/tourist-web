import {
  Grid,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem
} from "@material-ui/core";
import React, { useState } from "react";
import { CreateIndexPage, Page } from "../pageTypes";
import { WebRepository } from "../model";
import { ErrorSnackbar } from "../components/ErrorSnackbar";

export const CreateIndex: React.FC<{
  page: CreateIndexPage;
  route: (s: Page) => void;
}> = props => {
  const tour = props.page.tour;
  const [mapping, setMapping] = useState(
    new Map<string, WebRepository>(
      Array.from(tour.repositories.keys()).map(k => [
        k,
        { provider: "github", name: "" }
      ])
    )
  );
  const [error, setError] = useState(null as string | null);

  function setRepositoryTag(
    repository: string,
    e: React.ChangeEvent<{ value: string }>
  ) {
    const map = new Map(mapping);
    const webRepo = map.get(repository);
    const provider = webRepo ? webRepo.provider : "github";
    map.set(repository, { provider, name: e.target.value });
    setMapping(map);
  }

  function setGitProvider(
    repository: string,
    e: React.ChangeEvent<{ value: "github" | "gitlab" }>
  ) {
    const map = new Map(mapping);
    const webRepo = map.get(repository);
    const name = webRepo ? webRepo.name : "";
    map.set(repository, { provider: e.target.value, name });
    setMapping(map);
  }

  function finalize() {
    if (
      Array.from(mapping.entries()).some(([_, webRepo]) => webRepo.name === "")
    ) {
      setError("You must set a mapping for every repository.");
      return;
    }
    props.route({
      kind: "ViewTour",
      tour: props.page.tour,
      index: mapping
    });
  }

  return (
    <div>
      <Grid
        container
        style={{ height: "100vh" }}
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
                  <Grid item xs={12} key={repository}>
                    <Grid container alignItems="flex-end">
                      <Grid item xs={4}>
                        <Typography variant="h5">{repository}</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Select
                          value="github"
                          onChange={e =>
                            setGitProvider(repository, e as React.ChangeEvent<{
                              value: "github" | "gitlab";
                            }>)
                          }
                        >
                          <MenuItem value="github">GitHub</MenuItem>
                          <MenuItem value="gitlab">GitLab</MenuItem>
                        </Select>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          style={{ width: "100%" }}
                          onChange={e => setRepositoryTag(repository, e)}
                          value={
                            mapping.get(repository)
                              ? mapping.get(repository)!.name
                              : ""
                          }
                          label={
                            i === 0
                              ? "Repository Tag (e.g. noobmaster69/my-repo)"
                              : "Repository Tag"
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} style={{ textAlign: "right", marginTop: 50 }}>
              <Button onClick={finalize} color="primary" variant="outlined">
                Finalize
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
