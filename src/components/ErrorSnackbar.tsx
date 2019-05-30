import React from "react";
import { Snackbar, SnackbarContent, IconButton, Icon } from "@material-ui/core";
import { Theme, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => {
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

export const ErrorSnackbar: React.FC<{
  show: boolean;
  message?: string;
  hideError: () => void;
}> = props => {
  const classes = useStyles(props);

  return (
    <Snackbar
      open={props.show}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      autoHideDuration={6000}
    >
      <SnackbarContent
        message={
          <span>
            <Icon className={classes.errIcon}>error</Icon>
            {props.message || "An Error Occurred"}
          </span>
        }
        action={[
          <IconButton key="close" color="inherit" onClick={props.hideError}>
            <Icon>close</Icon>
          </IconButton>
        ]}
        className={classes.bgErr}
      />
    </Snackbar>
  );
};
