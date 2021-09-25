import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import { ClipLoader } from "react-spinners";

const useStyles = makeStyles(theme => ({
  loader: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "20px",
    marginTop: "25vh",
  },
}));

export function Loader(props) {
  const classes = useStyles();
  return (
    <Grid className={classes.loader}>
      <ClipLoader color="#ff3f6ccc" loading={true} size={50} />
    </Grid>
  );
}
