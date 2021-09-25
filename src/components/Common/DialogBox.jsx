import {
  Button,
  Dialog,
  //   DialogActions,
  //   DialogContent,
  DialogTitle,
  OutlinedInput,
  TextField,
  Typography,
} from "@material-ui/core";

// import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import ClearIcon from "@material-ui/icons/Clear";

import { ActionButton } from ".";
const useStyles = makeStyles(theme => ({
  large: {
    maxWidth: "400px",
    maxHeight: "60vh",
  },
  ".MuiDialog-paperScrollPaper": {
    maxHeight: "90vh",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
    cursor: "pointer",
  },
}));

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    maxHeight: "50vh",
    minWidth: "60vh",
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    marginLeft: "20px",
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export function DialogBox(props) {
  const classes = useStyles();
  const { type, open, onClose, header, content, showAction, action } = props;

  return (
    <Dialog aria-labelledby="customized-dialog-title" open={open} maxWidth="xs">
      <DialogTitle id="customized-dialog-title">
        {header}
        <ClearIcon className={classes.closeButton} onClick={onClose} />
      </DialogTitle>
      <DialogContent dividers>{content}</DialogContent>
      {showAction && <DialogActions>{action}</DialogActions>}
    </Dialog>
  );
}
