import React, { useState } from "react";
import { UploadTourPage, Page } from "../pageTypes";
import {
  Typography,
  Grid,
  Snackbar,
  SnackbarContent,
  Button,
  IconButton,
  Icon
} from "@material-ui/core";
import { parseTour } from "../model";
import { Theme, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => {
  console.log(theme);
  return {
    bgErr: {
      backgroundColor: theme.palette.error.dark
    },
    errIcon: {
      fontSize: 20,
      opacity: 0.9,
      marginRight: 10
    }
  };
});

export const UploadTour: React.FC<{
  page: UploadTourPage;
  route: (s: Page) => void;
}> = props => {
  const [error, setError] = useState(null as string | null);
  const classes = useStyles(props);

  function uploadTour(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files![0];

    const fr = new FileReader();
    fr.readAsText(file);
    fr.onload = loaded => {
      const json = (loaded.target as any).result;
      const tour = parseTour(json);
      if (typeof tour == "string") {
        setError(tour);
        return;
      }
      props.route({
        kind: "CreateIndex",
        tour: tour
      });
    };
  }

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item xs={7} style={{ textAlign: "center" }}>
        <Typography variant="h3" style={{ marginBottom: 20 }}>
          Welcome to Tourist!
        </Typography>
        <p>
          Tourist is a new approach to documentation that allows programmers to
          explain low-level technical details of a system while simultaneously
          providing the context of how those details fit into the broader
          architecture. It lets programmers document code in the same way that
          they would explain it in person: by walking the consumer step-by-step
          through the important parts of a codebase.
        </p>
        <Button
          style={{ marginTop: 80 }}
          color="primary"
          variant="outlined"
          component="label"
        >
          Upload a Tour
          <input type="file" style={{ display: "none" }} onInput={uploadTour} />
        </Button>
        <Snackbar
          open={error !== null}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          autoHideDuration={6000}
        >
          <SnackbarContent
            message={
              <span>
                <Icon className={classes.errIcon}>error</Icon>
                {error}
              </span>
            }
            action={[
              <IconButton
                key="close"
                color="inherit"
                onClick={() => setError(null)}
              >
                <Icon>close</Icon>
              </IconButton>
            ]}
            className={classes.bgErr}
          />
        </Snackbar>
      </Grid>
    </Grid>
  );
};
