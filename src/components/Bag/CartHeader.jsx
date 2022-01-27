import { useEffect, useState } from "react";

import { Link, useHistory, useLocation } from "react-router-dom";

import { Grid, makeStyles } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";

import logo from "../../images/logo.jpg";
import { getItemsFromCart } from "../../apis/productService";
import { useLogin, useProduct } from "../../context";
import { getAddressList } from "../../apis/userService";

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
  },
  active_list: {
    fontSize: "12px",
    fontWeight: 600,
    color: "#20BD99",
    paddingBottom: "2px",
    borderBottom: "3px solid #20BD99",
  },
}));
export const CartHeader = () => {
  const classes = useStyles();
  const history = useHistory();
  const path = useLocation();
  const { userState, userDispatch } = useLogin();
  const { productsDispatch } = useProduct();
  const [activeLink, setActiveLink] = useState("bag");
  const loadDetails = () => {
    if (path.pathname === "/checkout/cart") {
      setActiveLink("bag");
    } else if (path.pathname === "/checkout/address") {
      setActiveLink("address");
    } else if (path.pathname === "/checkout/payment") {
      setActiveLink("payment");
    }

    // get wishlist if logged in
    if (userState.token) {
      getItemsFromCart().then(res =>
        productsDispatch({
          type: "SET_CART_ITEMS",
          payload: res.data.data?.products,
        })
      );

      getAddressList().then(res =>
        userDispatch({
          type: "SET_ADDRESSES_LIST",
          payload: res.data.data,
        })
      );
    }
  };
  useEffect(
    () => {
      loadDetails();
    },
    // eslint-disable-next-line
    [path.pathname]
  );

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
            <li
              className={
                activeLink === "bag" ? classes.active_list : classes.list
              }
              onClick={() => {
                if (activeLink === "address" || activeLink === "payment") {
                  history.push("/checkout/cart");
                } else {
                  return;
                }
              }}
            >
              bag
            </li>
            <li className={classes.dashedSeprator}></li>
            <li
              className={
                activeLink === "address" ? classes.active_list : classes.list
              }
              onClick={() => {
                if (activeLink === "payment") {
                  history.push("/checkout/address");
                } else {
                  return;
                }
              }}
            >
              address
            </li>
            <li className={classes.dashedSeprator}></li>
            <li
              className={
                activeLink === "payment" ? classes.active_list : classes.list
              }
            >
              payment
            </li>
          </ul>
        </Grid>
        <Grid className={classes.catInfoLogo} style={{ marginRight: "30px" }}>
          <Link to="/" className={classes.verifiedContainer}>
            <VerifiedUserIcon fontSize="large" htmlColor="#14CDA8" />
            100 % SECURE
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};
