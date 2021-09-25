import {
  Box,
  Grid,
  makeStyles,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { CartHeader, Footer, OrderTile } from "../../components";
import { useLogin, useProduct } from "../../context";
import { ActionButton, DialogBox } from "../Common";

import StripeCheckout from "react-stripe-checkout";
import { addPaymnet } from "../../apis/productService";
import { calculateCartValue } from "../../utils/utilities";
const useStyles = makeStyles(theme => ({
  root: {
    //  marginTop: "15px"
  },
  container: {
    padding: "0px 10px",
    width: "70%",
    margin: "0 auto",
    padding: "0px 15px",
    minHeight: "75vh",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  first: {
    padding: "30px 20px 10px 0px",
    borderRight: "1px solid #d4d5d9",
  },
  second: {
    padding: "30px 15px",
  },
}));
export const Payment = () => {
  const classes = useStyles();
  const history = useHistory();

  const { userState, userDispatch } = useLogin();
  const { productsState, productsDispatch } = useProduct();

  const checkout = async token => {
    try {
      console.log(token);
      let requestParams = {
        token: token,
        amount: calculateCartValue(productsState?.cartItems)[3] * 100,
        addressId: userState?.selectedAddress?._id,
        products: productsState.cartItems,
      };
      const res = await addPaymnet(requestParams);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!userState?.selectedAddress?._id) {
      history.push("/checkout/address");
    }
  }, []);

  return (
    <div className={classes.root}>
      <CartHeader />
      <Grid container className={classes.container}>
        <Grid
          item
          xs={12}
          sm={12}
          md={8}
          lg={8}
          xl={8}
          className={classes.first}
        >
          <StripeCheckout
            stripeKey="pk_test_51JcWeNSIbA2UPd9FOXHf3hqrF8yHgFdHTy5pIDblF7NbtZJHJz6bLTPdQAWR0KJRInOq9MM46mHQIrJKhb9ITNey00D54eLNnn"
            token={checkout}
            name="Checkout"
            amount={calculateCartValue(productsState?.cartItems)[3]}
            currency="INR"
            email="doe@yopmail.com"
          >
            {/* <button onClick={checkout}>Checkout</button> */}
          </StripeCheckout>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          lg={4}
          xl={4}
          className={classes.second}
        >
          <OrderTile />
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};
