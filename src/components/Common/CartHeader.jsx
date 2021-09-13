import { Grid, makeStyles } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import logo from "../../images/logo.jpg";
import { Link, useHistory } from "react-router-dom";
const useStyles = makeStyles(theme => ({
  root: {
    position: "sticky",
    // boxShadow: "0 4px 12px 0 #0000000d",
    borderBottom: "1px solid #F5F5F6",
    // lineHeight: "80px",
    width: "100%",
    padding: "20px 0px 0px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  catInfoLogo: {
    marginLeft: "25px",
    display: "flex",
    // alignItems: "center",
    fontWeight: "500",
    fontSize: "14px",
    color: "#282c3f",
    lineHeight: "40px",
    textTransform: "uppercase",
  },
  catContainer: {
    padding: "0 12px 0 12px",
    textDecoration: "none",
    color: "#282c3f",
    cursor: "pointer",
  },
  verifiedContainer: {
    display: "flex",
    textDecoration: "none",
    color: "#535766",
    letterSpacing: "3px",
    cursor: "default",
  },
  ulCSS: {
    listStyle: "none",
    display: "inline-flex",
    margin: "5px",
    textTransform: "uppercase",
    color: "#696B79",
    letterSpacing: "3px",
  },
  dashedSeprator: {
    borderBottom: "1px dashed gray",
    height: "9px",
    width: "50px",
    margin: "0px 10px",
  },
  list: {
    fontSize: "12px",
    fontWeight: 500,
    "&:active": {
      color: "#20BD99",
      borderBottom: "2px solid #20BD99",
    },
  },
}));
export const CartHeader = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.root}>
      <Grid container className={classes.header}>
        <Grid className={classes.catInfoLogo}>
          <Link
            to="/"
            className={`${classes.catContainer}`}
            style={{ marginRight: "20px" }}
          >
            <img src={logo} alt="app-logo" height="40px" width="40px" />
          </Link>
        </Grid>
        <Grid>
          <ul className={classes.ulCSS}>
            <li className={classes.list}>bag</li>
            <li className={classes.dashedSeprator}></li>
            <li className={classes.list}>address</li>
            <li className={classes.dashedSeprator}></li>
            <li className={classes.list}>payment</li>
          </ul>
        </Grid>
        <Grid className={classes.catInfoLogo} style={{ marginRight: "30px" }}>
          <Link className={classes.verifiedContainer}>
            <VerifiedUserIcon fontSize="large" htmlColor="#14CDA8" />
            100 % SECURE
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};
