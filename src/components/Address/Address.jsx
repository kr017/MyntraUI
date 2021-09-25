import {
  Box,
  Grid,
  makeStyles,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { useState } from "react";
import { useHistory } from "react-router-dom";

import {
  CartHeader,
  Footer,
  BagTile,
  AddressBigTile,
  OrderTile,
  AddressForm,
} from "../../components";
import { useLogin, useProduct } from "../../context";
import { ActionButton, DialogBox, SnackbarView } from "../Common";

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

export const Address = () => {
  const classes = useStyles();
  const history = useHistory();

  const { userState, userDispatch } = useLogin();
  const { productsState, productsDispatch } = useProduct();
  const [open, setOpen] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [message, setMessage] = useState({});
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = useState(userState?.selectedAddress?._id);

  const handleChange = (address, id) => {
    setValue(id);

    userDispatch({
      type: "SET_SELECTED_ADDRESS",
      payload: address,
    });
  };
  const getAddresses = () => {
    return (
      <div>
        {" "}
        {userState?.addresses?.length > 0 &&
          userState.addresses.map((address, id) => (
            <Grid container key={id}>
              <Grid item>
                {" "}
                <input
                  type="radio"
                  name="address"
                  checked={address._id === value}
                  onChange={() => handleChange(address, address._id)}
                />
                {address.name}
              </Grid>{" "}
              <Grid item>
                <Grid>
                  {address?.street}
                  {", "}
                </Grid>
                <Grid>
                  {address?.city}
                  {" - "}
                  {address?.zip}
                </Grid>
              </Grid>
            </Grid>
          ))}
        <Box style={{ marginTop: "15px" }}>
          <ActionButton
            style={{ width: "100%" }}
            kind="SECONDARY"
            label="add new address"
            handleClick={() => {
              handleClose();
              setShowAddressForm(true);
              // handleAddToWishlist(product);
            }}
          />
        </Box>
      </div>
    );
  };
  return (
    <div className={classes.root}>
      {message && message?.type && <SnackbarView message={message} />}
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
          Select delivery address
          {userState?.addresses?.length > 0 &&
            userState.addresses.map((address, id) => (
              <AddressBigTile address={address} />
            ))}
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
          <ActionButton
            kind="SIMPLE_PRIMARY"
            label="Continue"
            handleClick={() => {
              if (!userState?.selectedAddress?._id) {
                setMessage(prevState => ({
                  ...prevState,
                  message: "Please select address",
                  type: "error",
                  actionMsg: "OK",
                  actionHandler: () => {
                    history.push("/login");
                  },
                }));
              } else {
                history.push("/checkout/payment");
              }
            }}
          />
        </Grid>
      </Grid>

      <Footer />

      {/* address list */}
      <DialogBox
        open={open}
        onClose={handleClose}
        header="Change Delivery Address"
        content={getAddresses()}
        onClose={handleClose}
        // action
      />

      {/* address form */}
      {showAddressForm && (
        <AddressForm
          onAddressClose={() => {
            setShowAddressForm(false);
          }}
        />
      )}
    </div>
  );
};
