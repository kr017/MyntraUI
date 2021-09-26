import { Box, Grid, makeStyles } from "@material-ui/core";

import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { CartHeader, Footer, OrderTile } from "../../components";
import { useLogin, useProduct } from "../../context";
import { DialogBox, SnackbarView, Loader } from "../Common";
import StripeCheckout from "react-stripe-checkout";
import { addPaymnet } from "../../apis/productService";
import { calculateCartValue } from "../../utils/utilities";
import { DeliveryTruck } from "../../images";
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
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const [loading, setLoading] = useState(false);
  const checkout = token => {
    setLoading(true);
    let requestParams = {
      token: token,
      amount: calculateCartValue(productsState?.cartItems)[3] * 100,
      addressId: userState?.selectedAddress?._id,
      products: productsState.cartItems,
    };

    addPaymnet(requestParams)
      .then(res => {
        if (res.data.status === 200) {
          productsDispatch({
            type: "SET_CART_ITEMS",
            payload: [],
          });

          setOrderDetails(res.data.data?.payment);
          setOpen(true);
          setLoading(false);
        } else {
          setMessage(prevState => ({
            ...prevState,
            message: "Something went wrong please try again",
            type: "error",
            actionMsg: "OK",
            actionHandler: () => {
              history.push("/my/address");
            },
          }));

          setLoading(false);
        }
      })
      .catch(err => {
        setMessage(prevState => ({
          ...prevState,
          message: "Something went wrong please try again",
          type: "error",
          actionMsg: "OK",
          actionHandler: () => {
            history.push("/my/address");
          },
        }));
      });
  };

  useEffect(() => {
    if (!userState?.selectedAddress?._id) {
      history.push("/checkout/address");
    }
  }, []);
  const getDialogMsg = () => {
    return (
      <Grid style={{ textAlign: "center" }}>
        <b style={{ color: "#20BD99", fontSize: "20px", fontWeight: 600 }}>
          Your order is Placed.
        </b>
        <div> Thank you for shopping with us.</div>
        <div>It will be delivered soon</div>
        <div
          style={{
            margin: "0 auto",
            height: "100px",
            maxHeight: "150px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={DeliveryTruck}
            alt="delivery-truck"
            style={{ height: "100%" }}
          />
        </div>
        <div>
          You can note down your TransactionID: <b>{orderDetails?.id}</b>
        </div>
        <div style={{ marginTop: "4px" }}>
          <a href={orderDetails?.receiptUrl} target="_blank">
            Click to view Your Inovice
          </a>
          <div style={{ marginTop: "4px" }}>
            You can track your order <a href="/my/orders">here</a>
          </div>
        </div>
      </Grid>
    );
  };
  const handleClose = () => {
    history.push("/shop/men");
  };
  return (
    <div className={classes.root}>
      <CartHeader />
      {message && message?.type && <SnackbarView message={message} />}
      {loading && <Loader />}
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
          {!loading && (
            <StripeCheckout
              stripeKey="pk_test_51JcWeNSIbA2UPd9FOXHf3hqrF8yHgFdHTy5pIDblF7NbtZJHJz6bLTPdQAWR0KJRInOq9MM46mHQIrJKhb9ITNey00D54eLNnn"
              token={checkout}
              name="Checkout"
              amount={calculateCartValue(productsState?.cartItems)[3] * 100}
              currency="INR"
              email={userState?.email}
            >
              {/* <button onClick={checkout}>Checkout</button> */}
            </StripeCheckout>
          )}
        </Grid>

        {/* {productsState?.cartItems?.length > 0 && ( */}
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
        {/* )} */}
      </Grid>
      <Footer />

      {/* successful payment */}
      <DialogBox
        open={open}
        onClose={handleClose}
        header="Order Placed"
        content={getDialogMsg()}
        onClose={handleClose}
        // action
      />
    </div>
  );
};
