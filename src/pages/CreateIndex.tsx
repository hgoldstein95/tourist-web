import { Grid, Typography, TextField, Button } from "@material-ui/core";
import React, { useState } from "react";
import { CreateIndexPage, Page } from "../pageTypes";
import { WebRepository } from "../model";

export const CreateIndex: React.FC<{
  page: CreateIndexPage;
  route: (s: Page) => void;
}> = props => {
  const tour = props.page.tour;
  const [mapping, setMapping] = useState(new Map<string, WebRepository>());

  function mapRepository(
    repository: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const map = new Map(mapping);
    map.set(repository, { provider: "github", name: e.target.value });
    setMapping(map);
  }

  function finalize() {
    props.route({
      kind: "ViewTour",
      tour: props.page.tour,
      index: mapping
    });
  }

  return (
    <Grid
      container
      style={{ height: "100vh" }}
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12} md={6}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h4">{tour.title}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              {Array.from(tour.repositories.keys()).flatMap(repository => [
                <Grid item xs={6}>
                  {repository}
                </Grid>,
                <Grid item xs={6}>
                  <TextField
                    style={{ width: "100%" }}
                    onChange={e =>
                      mapRepository(repository, e as React.ChangeEvent<
                        HTMLInputElement
                      >)
                    }
                    value={
                      mapping.get(repository)
                        ? mapping.get(repository)!.name
                        : ""
                    }
                  />
                </Grid>
              ])}
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ textAlign: "right" }}>
            <Button onClick={finalize} color="primary" variant="outlined">
              Finalize
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
