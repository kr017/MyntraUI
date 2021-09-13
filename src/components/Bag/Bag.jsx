import { Grid, makeStyles } from "@material-ui/core";
import { CartHeader, Footer } from "../Common";
const useStyles = makeStyles(theme => ({
  root: {},
  first: { padding: "20px 15px 20px 40px", borderRight: "1px solid #d4d5d9" },
  second: { padding: "20px 15px " },
}));
export const Bag = () => {
  const classes = useStyles();
  return (
    <div>
      <CartHeader />
      <Grid container>
        <Grid item xs={8} sm={8} md={8} lg={8} xl={8} className={classes.first}>
          Hello
        </Grid>
        <Grid
          item
          xs={4}
          sm={4}
          md={4}
          lg={4}
          xl={4}
          className={classes.second}
        >
          hey
        </Grid>
      </Grid>

      <Footer />
    </div>
  );
};
