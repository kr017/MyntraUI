import { useHistory } from "react-router-dom";

import { useFormik } from "formik";
import * as yup from "yup";

import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { InputBox, ActionButton, SnackbarView } from "../Common";
import { useLogin } from "../../context";

import { Header } from "../../components";
import { login, signup } from "../../apis/userService";
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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

export function SignUp(props) {
  const classes = useStyles();
  const history = useHistory();

  const { userDispatch } = useLogin();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const validationSchema = yup.object({
    username: yup.string("Enter your name").required("Name is required"),
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });
  const formik = useFormik({
    initialValues: { username: "", email: "", password: "" },
    validationSchema: validationSchema,
    onSubmit: values => {
      setLoading(true);
      let requestParams = {
        name: values.username,
        email: values.email,
        password: values.password,
      };

      signup(requestParams)
        .then(res => {
          setLoading(false);
          debugger;
          if (res.status === 200) {
            setMessage(prevState => ({
              ...prevState,
              message: "Registration successful, Please login",
              type: "success",
              actionMsg: "OK",
              actionHandler: () => {
                history.push("/login");
              },
            }));
          } else {
            setMessage(prevState => ({
              ...prevState,
              message: "Something went wrong please try again",
              type: "error",
              actionMsg: "OK",
              actionHandler: () => {
                history.push("/signup");
              },
            }));
          }
        })
        .catch(error => {
          setMessage(prevState => ({
            ...prevState,
            message: "Something went wrong please try again",
            type: "error",
            actionMsg: "OK",
            actionHandler: () => {
              history.push("/signup");
            },
          }));

          setLoading(false);
        });
    },
  });

  return (
    <div className={classes.root}>
      <Header />

      {message && message?.type && <SnackbarView message={message} />}
      <Grid container className={classes.container}>
        <Grid className={classes.content}>
          <div className={classes.bannerContainer}>
            {/* <img src={logo} alt="login_banner" />
             */}
            <span style={{ fontSize: "40px" }}>WishAt</span>
          </div>
          <div className={classes.loginContainer}>
            <div className={classes.loginLabel}>Login </div>

            <form onSubmit={formik.handleSubmit}>
              <InputBox
                id="username"
                name="username"
                placeholder="Name"
                fullWidth
                value={formik.values.username}
                onChange={formik.handleChange}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />{" "}
              <InputBox
                id="email"
                name="email"
                placeholder="Email"
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
                placeholder="Password"
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

            <div
              style={{
                textAlign: "center",
                marginTop: "4px",
                cursor: "pointer",
              }}
              onClick={() => history.push("/login")}
            >
              Already a user? Login here
            </div>
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
