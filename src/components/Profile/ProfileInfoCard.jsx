import { Grid, makeStyles } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "10px 15px",
    // display: "flex",
    flexDirection: "column",
    width: "220px",
    textTransform: "capitalize",
  },
  mailContainer: {
    marginBottom: "10px",
    borderBottom: "1px solid #d4d5d9",
  },
  link: {
    textDecoration: "none",
    fontWeight: 400,
    fontSize: "16px",
    color: "#3E4152",
    "&:hover": {
      fontWeight: 600,
    },
  },
}));
export const ProfileInfoCard = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Grid container className={classes.root}>
      <nav item>Hello {"Kiran"}</nav>
      <nav className={classes.mailContainer}>{"mail"}</nav>

      <Link className={classes.link} onClick={() => history.push("/wishlist")}>
        wishlist
      </Link>
      <Link className={classes.link}>orders</Link>
      <Link className={classes.link}>logout</Link>
    </Grid>
  );
};
