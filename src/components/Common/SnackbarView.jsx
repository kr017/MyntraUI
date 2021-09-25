import { Button, Snackbar } from "@material-ui/core";
import React from "react";
import Alert from "@material-ui/lab/Alert";

/*
type:"success | warning | info | error"
*/
export const SnackbarView = ({ message }) => {
  console.log(message);
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={true}
      autoHideDuration={6000}
      //   onClose={handleClose}
      // message={message}
    >
      <Alert
        variant="filled"
        // onClose={handleClose}
        severity={message?.type}
        action={
          <Button color="inherit" size="small" onClick={message?.actionHandler}>
            {message?.actionMsg}
          </Button>
        }
      >
        {message?.message}
      </Alert>
    </Snackbar>
  );
};
