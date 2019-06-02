import React from "react";
import { WebRepository } from "../model";
import {
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem
} from "@material-ui/core";

export const WebRepositoryEditor: React.FC<{
  repoName: string;
  repository: WebRepository;
  onChange: (wr: WebRepository) => void;
  first?: boolean;
}> = props => {
  const provider = props.repository.provider;

  function handleNameChange(name: string) {
    props.repository.name = name;
    props.onChange(props.repository);
  }

  function handleProviderChange(provider: "github" | "gitlab") {
    props.repository.provider = provider;
    props.onChange(props.repository);
  }

  function handleProjectChange(project: number) {
    if (props.repository.provider === "gitlab") {
      props.repository.project = project;
      props.onChange(props.repository);
    }
  }

  return (
    <Grid item xs={12}>
      <Grid container alignItems="flex-end">
        <Grid item xs={3}>
          <Typography variant="h5">{props.repoName}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Select
            value={provider}
            onChange={e =>
              handleProviderChange(e.target.value as "github" | "gitlab")
            }
          >
            <MenuItem value="github">GitHub</MenuItem>
            <MenuItem value="gitlab">GitLab</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={provider !== "gitlab" ? 7 : 5}>
          <TextField
            style={{ width: "100%" }}
            value={props.repository.name}
            label={
              props.first && provider !== "gitlab"
                ? "Repository Tag (e.g. noobmaster69/my-repo)"
                : "Repository Tag"
            }
            onChange={e => handleNameChange(e.target.value)}
          />
        </Grid>
        {provider === "gitlab" && (
          <Grid item xs={2}>
            <TextField
              style={{ width: "100%", marginLeft: 10 }}
              type="number"
              value={
                props.repository.provider === "gitlab"
                  ? props.repository.project
                  : 0
              }
              label="GitLab Project"
              onChange={e => handleProjectChange(+e.target.value)}
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};
