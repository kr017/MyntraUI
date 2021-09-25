import { OutlinedInput, TextField } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({}));
export function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const inputProps = {
    step: 300,
  };
  return (
    <div className={classes.root}>
      <OutlinedInput id="time" type="text" inputProps={inputProps} />;
    </div>
  );
}
