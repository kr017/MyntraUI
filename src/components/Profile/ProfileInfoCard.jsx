import { Grid, makeStyles } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useLogin, useProduct } from "../../context";
import { ActionButton } from "../Common";

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
  const { userState, userDispatch } = useLogin();
  const { productsDispatch } = useProduct();

  const handleLogOut = () => {
    userDispatch({ type: "LOGOUT" });
    productsDispatch({ type: "SET_WISHLIST_ITEMS", payload: null });
    productsDispatch({ type: "SET_CART_ITEMS", payload: null });

    localStorage.removeItem("hint");

    history.push("/");
  };
  return (
    <Grid container className={classes.root}>
      {userState?.token ? (
        <>
          <nav item>Hello {userState?.name ? userState?.name : ""}</nav>
          <nav
            className={classes.mailContainer}
            style={{ textTransform: "none" }}
          >
            {userState?.email ? userState?.email : ""}
          </nav>

          <Link
            className={classes.link}
            onClick={() => history.push("/wishlist")}
          >
            wishlist
          </Link>
          <Link
            className={classes.link}
            onClick={() => history.push("/my/orders")}
          >
            orders
          </Link>
          <Link className={classes.link} onClick={() => handleLogOut()}>
            logout
          </Link>
        </>
      ) : (
        <>
          <nav item>Welcome</nav>
          <nav className={classes.mailContainer}>To access account</nav>
          <ActionButton
            kind="SECONDARY"
            label="login/signup"
            style={{ color: "#ff3e6c", padding: "2px 0px", width: "auto" }}
            handleClick={() => history.push("/login")}
          />
          <ActionButton />
        </>
      )}
    </Grid>
  );
};
