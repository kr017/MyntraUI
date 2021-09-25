import { useHistory } from "react-router-dom";

import { useFormik } from "formik";
import * as yup from "yup";

import { makeStyles } from "@material-ui/core/styles";
import { Backdrop, Button, CircularProgress, Grid } from "@material-ui/core";
import { InputBox, ActionButton } from "../Common";
import { useLogin } from "../../context";

import { Header } from "../../components";
import { login } from "../../apis/userService";
import { ClipLoader } from "react-spinners";
import { useState } from "react";

const useStyles = makeStyles(theme => ({
  backdrop: {
    color: "#fff",
    position: "absolute",
    zIndex: 100,
  },
  root: {
    // position: "relative",  zIndex: 0,
    backgroundColor: "#FFE6F3",
    height: "100vh",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "8vh",
  },
  content: {
    width: "400px",
  },
  bannerContainer: {
    height: "160px",
    backgroundColor: "#FFF9E7",
  },
  banner: {
    width: "100%",
    height: "250px",
  },
  loginLabel: {
    marginBottom: "20px",
    fontWeight: 500,
    fontSize: "20px",
  },
  loginContainer: {
    padding: "30px",
    backgroundColor: "#fff",
  },
  primaryBtn: {
    color: "#fff",
    backgroundColor: "#ff3e6c",
    borderColor: "#ff3e6c",
    fontWeight: 600,
    padding: "12px",
    marginRight: "20px",
    "&:hover": {
      backgroundColor: "#ec5e80",
    },
  },
}));

export function Login(props) {
  const classes = useStyles();
  const history = useHistory();

  const { userDispatch } = useLogin();
  const [loading, setLoading] = useState(false);
  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      // .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "k@gmail.com",
      password: "1234",
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      setLoading(true);
      login(values)
        .then(res => {
          setLoading(false);
          userDispatch({ type: "LOGIN", payload: res.data.data });
          if (res?.data?.data?.token) {
            localStorage.setItem("hint", JSON.stringify(res.data.data));
          }
          history.push("/");
        })
        .catch(error => {});
    },
  });

  return (
    <div className={classes.root}>
      <Header />

      <Grid container className={classes.container}>
        <Grid className={classes.content}>
          <div className={classes.bannerContainer}>
            {/* <img src={LoginBanner} alt="login_banner" /> */}
          </div>
          <div className={classes.loginContainer}>
            <div className={classes.loginLabel}>
              Login{" "}
              <span
                style={{
                  color: "#535766",
                  fontSize: "16px",
                  fontWeight: 400,
                }}
              >
                or
              </span>{" "}
              Signup
            </div>

            <form onSubmit={formik.handleSubmit}>
              <InputBox
                id="email"
                name="email"
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />{" "}
              <InputBox
                fullWidth
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />{" "}
              <ActionButton
                kind="PRIMARY"
                type="submit"
                label={
                  loading ? (
                    <ClipLoader color="#ffffff" loading={true} size={20} />
                  ) : (
                    "login"
                  )
                }
                style={{
                  width: "100%",
                  padding: "6px 45px",
                  borderRadius: "0px",
                }}
              />
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

// <Backdrop
//         className={classes.backdrop}
//         open={true}
//         // onClick={handleClose}
//       >
//         {" "}
//         <CircularProgress color="inherit" />  </Backdrop>
