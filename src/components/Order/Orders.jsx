import { Grid, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getOrders } from "../../apis/productService";

import { useProduct } from "../../context";
import { Header, Footer, ShopNow, OrderDetailsTile } from "../../components";
import { SnackbarView } from "../Common";
import { ClipLoader } from "react-spinners";

const useStyles = makeStyles(theme => ({
  container: {
    // minHeight: "70vh",
    maxWidth: "70%",
    margin: "0 auto",
    [theme.breakpoints.up("xs")]: {
      // display: "none",
      maxWidth: "90%",
    },
  },
}));
export const Order = () => {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { productsState, productsDispatch } = useProduct();
  const getAllOrders = () => {
    setLoading(true);
    getOrders()
      .then(res => {
        productsDispatch({
          type: "SET_ORDERS_LIST",
          payload: res?.data?.data,
        });
      })
      .catch(error => {
        setMessage(prevState => ({
          ...prevState,
          message: "Something went wrong please try again",
          type: "error",
          actionMsg: "OK",
          actionHandler: () => {
            history.push("/login");
          },
        }));

        setLoading(false);
      });
  };

  useEffect(() => {
    getAllOrders();
  }, []);
  return (
    <div>
      <Header />
      {message && message?.type && <SnackbarView message={message} />}
      {loading && <ClipLoader color="#ffffff" loading={true} size={20} />}

      <div className={classes.container}>
        {productsState?.ordersList?.length > 0 ? (
          <Grid>
            {productsState?.ordersList?.map((order, id) => (
              <Grid key={id} style={{ marginBottom: "8px" }}>
                <OrderDetailsTile details={order} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid style={{ marginTop: "20px" }}>
            <ShopNow />
          </Grid>
        )}
      </div>

      <Footer />
    </div>
  );
};
