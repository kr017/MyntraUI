import { useState } from "react";

import { Field, useFormik, FormikProvider } from "formik";
import * as yup from "yup";

import { DialogBox, InputBox, ActionButton } from "../Common";
import { makeStyles } from "@material-ui/core/styles";
import { Box, NativeSelect, Typography } from "@material-ui/core";
import { addAddress } from "../../apis/userService";
import { useLogin } from "../../context";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles(theme => ({
  container: {
    padding: "10px",
  },
}));
export const AddressForm = props => {
  const classes = useStyles();
  const history = useHistory();
  const { userDispatch } = useLogin();
  const [loading, setLoading] = useState(false);

  const options = [
    { label: "USA", level: 1 },
    { label: "Canada", level: 2 },
    { label: "Bangladesh", level: 3 },
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
          //   userDispatch({ type: "LOGIN", payload: res.data.data });
          //   if (res?.data?.data?.token) {
          //     localStorage.setItem("hint", JSON.stringify(res.data.data));
          //   }
          //   history.push("/");

          props?.onAddressClose(); //closing dialog
        })
        .catch(error => {});
    },
  });
  const getAddressForm = () => {
    return (
      <FormikProvider value={formik}>
        <form id="address-form" onSubmit={formik.handleSubmit}>
          <Box className={classes.container}>
            <Typography>Contact Details</Typography>
            <InputBox
              id="contactName"
              name="contactName"
              fullWidth
              value={formik.values.contactName}
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
              fullWidth
              value={formik.values.zip}
              onChange={formik.handleChange}
              error={formik.touched.zip && Boolean(formik.errors.zip)}
              helperText={formik.touched.zip && formik.errors.zip}
            />{" "}
            <InputBox
              id="street"
              name="street"
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
              value={formik.values.locality}
              onChange={formik.handleChange}
              error={formik.touched.locality && Boolean(formik.errors.locality)}
              helperText={formik.touched.locality && formik.errors.locality}
            />{" "}
            <InputBox
              fullWidth
              id="city"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />{" "}
            <NativeSelect
              id="state"
              value={formik.values.state}
              onChange={formik.handleChange}
              //   input={<BootstrapInput />}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
              {...formik.getFieldProps("state")}
            >
              {options.map((item, index) => (
                <option>{item.label}</option>
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
        label="add to bag"
        style={{ paddingLeft: "45px", paddingRight: "45px", width: "100%" }}
        // startIcon={<LocalMallIcon fontSize="small" />}
        handleClick={() => {
          //   handleAddToCart(product);
        }}
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