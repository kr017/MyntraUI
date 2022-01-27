import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik, FormikProvider } from "formik";
import * as yup from "yup";

import { DialogBox, InputBox, ActionButton, SnackbarView } from "../Common";
import { makeStyles } from "@material-ui/core/styles";
import { Box, NativeSelect, Typography } from "@material-ui/core";
import { addAddress } from "../../apis/userService";
import { useLogin } from "../../context";
const useStyles = makeStyles(theme => ({
  container: {
    padding: "10px",
  },
}));
export const AddressForm = props => {
  const classes = useStyles();
  const history = useHistory();
  const { userState, userDispatch } = useLogin();
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const options = [
    { label: "CANADA", level: 1 },

    { label: "INDIA", level: 2 },
  ];
  const validationSchema = yup.object({
    contactName: yup
      .string("This is mandatory field")
      .required("This is mandatory field"),
    contactNumber: yup
      .string("Please enter valid mobile number")
      .min(10, "Min length is 10")
      .max(10, "Max length is 10")
      .required("This is mandatory field"),

    zip: yup
      .string("Please enter valid pincode")
      .min(6, "Minimum length is 6")
      .max(6, "Maximum length is 6")
      .required("This is mandatory field"),
    street: yup
      .string("Please enter valid address")
      .required("This is mandatory field"),
    locality: yup
      .string("Please enter valid locality or town name")
      .required("This is mandatory field"),
    city: yup
      .string("Please enter valid city")
      .required("This is mandatory field"),
    state: yup
      .string("Enter your password")
      // .min(8, "Password should be of minimum 8 characters length")
      .required("This is mandatory field"),
  });
  const formik = useFormik({
    initialValues: {
      contactName: "k@gmail.com",
      contactNumber: "",

      zip: "",
      street: "",
      locality: "",
      city: "",
      state: "",
      country: "",
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      let requestParam = {
        name: values.contactName,
        phoneNumber: values.contactNumber,

        zip: values.zip,
        street: values.street,
        locality: values.locality,
        city: values.city,
        state: values.state,
        country: "INDIA",
      };
      setLoading(true);
      addAddress(requestParam)
        .then(res => {
          setLoading(false);

          let addresses = [];
          if (userState?.addresses) {
            addresses = userState?.addresses;
            addresses.push(requestParam);
          } else {
            addresses.push(requestParam);
          }
          userDispatch({
            type: "ADD_ADDRESS",
            payload: addresses,
          });
          setMessage(prevState => ({
            ...prevState,
            message: "Address Saved!",
            type: "success",
            actionMsg: "OK",
            actionHandler: () => {
              history.push("/checkout/address");
            },
          }));
          props?.onAddressClose(); //closing dialog
        })
        .catch(error => {});
    },
  });
  const getAddressForm = () => {
    return (
      <FormikProvider value={formik}>
        {message && message?.type && <SnackbarView message={message} />}

        <form id="address-form" onSubmit={formik.handleSubmit}>
          <Box className={classes.container}>
            <Typography>Contact Details</Typography>
            <InputBox
              id="contactName"
              name="contactName"
              fullWidth
              value={formik.values.contactName}
              placeholder="Name"
              onChange={formik.handleChange}
              error={
                formik.touched.contactName && Boolean(formik.errors.contactName)
              }
              helperText={
                formik.touched.contactName && formik.errors.contactName
              }
            />{" "}
            <InputBox
              fullWidth
              id="contactNumber"
              name="contactNumber"
              placeholder="Contact Number"
              value={formik.values.contactNumber}
              onChange={formik.handleChange}
              error={
                formik.touched.contactNumber &&
                Boolean(formik.errors.contactNumber)
              }
              helperText={
                formik.touched.contactNumber && formik.errors.contactNumber
              }
            />
          </Box>

          <Box className={classes.container}>
            <Typography>Address</Typography>
            <InputBox
              id="zip"
              name="zip"
              placeholder="Pin code"
              fullWidth
              value={formik.values.zip}
              onChange={formik.handleChange}
              error={formik.touched.zip && Boolean(formik.errors.zip)}
              helperText={formik.touched.zip && formik.errors.zip}
            />{" "}
            <InputBox
              id="street"
              name="street"
              placeholder="Street Name"
              fullWidth
              value={formik.values.street}
              onChange={formik.handleChange}
              error={formik.touched.street && Boolean(formik.errors.street)}
              helperText={formik.touched.street && formik.errors.street}
            />{" "}
            <InputBox
              fullWidth
              id="locality"
              name="locality"
              placeholder="Locality"
              value={formik.values.locality}
              onChange={formik.handleChange}
              error={formik.touched.locality && Boolean(formik.errors.locality)}
              helperText={formik.touched.locality && formik.errors.locality}
            />{" "}
            <InputBox
              fullWidth
              id="city"
              name="city"
              placeholder="City"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />{" "}
            <NativeSelect
              id="state"
              value={formik.values.state}
              placeholder="Country"
              onChange={formik.handleChange}
              //   input={<BootstrapInput />}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
              {...formik.getFieldProps("state")}
            >
              {options.map((item, index) => (
                <option key={index}>{item.label}</option>
              ))}
            </NativeSelect>
          </Box>
        </form>
      </FormikProvider>
    );
  };

  const getAction = () => {
    return (
      <ActionButton
        type="submit"
        kind="PRIMARY"
        label="Save"
        style={{ paddingLeft: "45px", paddingRight: "45px", width: "100%" }}
        // startIcon={<LocalMallIcon fontSize="small" />}
        // handleClick={() => {

        //   // handleAddToCart(product);
        // }}
        form="address-form"
      />
    );
  };

  return (
    <DialogBox
      open={true}
      header="Add New Address"
      content={getAddressForm()}
      onClose={props?.onAddressClose}
      showAction={true}
      action={getAction()}
    />
  );
};

//  <Field as="select" name="color" {...formik.getFieldProps("color")}>
// {options.map((item, index) => (
//     <option>{item.label}</option>
//   ))}
// </Field>
