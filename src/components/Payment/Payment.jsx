import { Grid, makeStyles } from "@material-ui/core";

import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { CartHeader, Footer, OrderTile } from "../../components";
import { useLogin, useProduct } from "../../context";
import { DialogBox, SnackbarView, Loader, ActionButton } from "../Common";
import StripeCheckout from "react-stripe-checkout";
import {
  addPaymnet,
  addRzpOrder,
  addRzpPayment,
} from "../../apis/productService";
import { calculateCartValue, razorpayHandler } from "../../utils/utilities";
import { DeliveryTruck, StripeLogo, RazorpayLogo } from "../../images";
import { STRIPE_KEY } from "../../config";

const useStyles = makeStyles(theme => ({
  root: {
    //  marginTop: "15px"
  },
  container: {
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
  payContainer: {
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
  },
  logo: {
    height: "100px",
    width: "100px",
    borderRadius: "50%",
    margin: "10px",
  },
}));
export const Payment = () => {
  const classes = useStyles();
  const history = useHistory();

  const { userState } = useLogin();
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

  const handleRazorpay = () => {
    let amount = calculateCartValue(productsState?.cartItems)[3] * 100;

    addRzpOrder({
      amount: amount,
      addressId: userState?.selectedAddress?._id,
      products: productsState.cartItems,
    })
      .then(res => {
        // options.order_id = res.data.id;
        // options.amount = res.data.amount;

        const { data } = res;
        data.email = userState?.email;
        data.name = userState?.name;
        data.addressId = userState?.selectedAddress?._id;
        data.products = productsState.cartItems;
        data.order_id = razorpayHandler(data, captureHandler, failureHandler);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const captureHandler = response => {
    var values = {
      razorpay_signature: response.razorpay_signature,
      razorpay_order_id: response.razorpay_order_id,
      transactionid: response.razorpay_payment_id,
      transactionamount: response?.amount,
      addressId: userState?.selectedAddress?._id,
      products: productsState.cartItems,
    };

    addRzpPayment(values)
      .then(res => {
        productsDispatch({
          type: "SET_CART_ITEMS",
          payload: [],
        });

        setOrderDetails(res.data.data?.payment);
        setOpen(true);
        setLoading(false);
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

  const failureHandler = response => {
    // alert("Failed", response.error.metadata.payment_id);
  };
  useEffect(() => {
    if (!userState?.selectedAddress?._id) {
      history.push("/checkout/address");
    } // eslint-disable-next-line
  }, [userState?.selectedAddress]);

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
          {/* <a href={orderDetails?.receiptUrl} target="_blank" rel="noreferrer">
            Click to view Your Inovice
          </a> */}
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
      {loading ? (
        <Loader />
      ) : (
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
              <div className={classes.payContainer}>
                <img
                  src={RazorpayLogo}
                  alt="Raozorpaylogo"
                  className={classes.logo}
                />
                <div style={{ margin: "8px" }}>
                  To Pay with Razorpay Add any contact number and select
                  netbanking with any of the banks available.
                  <div style={{ marginTop: "4px" }}>
                    <ActionButton
                      kind="SIMPLE_PRIMARY"
                      label="PAY WITH RAZORPAY"
                      style={{ maxWidth: "200px", width: "200px" }}
                      handleClick={() => {
                        handleRazorpay();
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
            {!loading && (
              <div className={classes.payContainer}>
                <img
                  src={StripeLogo}
                  alt="StripeLogo"
                  className={classes.logo}
                />

                <div style={{ margin: "8px" }}>
                  To Pay with Stripe add <b>4242 4242 4242 4242</b> as card
                  number with any future date as expiry and any 3digits as CVC.
                  <div style={{ marginTop: "4px" }}>
                    <StripeCheckout
                      stripeKey={STRIPE_KEY}
                      token={checkout}
                      name="Checkout"
                      amount={
                        calculateCartValue(productsState?.cartItems)[3] * 100
                      }
                      currency="INR"
                      email={userState?.email}
                    ></StripeCheckout>
                  </div>
                </div>
              </div>
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
      )}
      <Footer />

      {/* successful payment */}
      <DialogBox
        open={open}
        onClose={handleClose}
        header="Order Placed"
        content={getDialogMsg()}

        // action
      />
    </div>
  );
};
