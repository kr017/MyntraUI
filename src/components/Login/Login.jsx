import { Grid, Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { Header } from "../Common";
const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    justifyContent: "center",
  },
  content: {
    width: "500px",
  },
  banner: {
    width: "500px",
    height: "250px",
  },
  login: {
    marginBottom: "20px",
    fontWeight: 500,
    fontSize: "20px",
  },
}));

export function Login(props) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <Header />

      <Grid container className={classes.container}>
        <Grid className={classes.content}>
          <div>
            {/* <img
              src={LoginBanner}
              alt="login_banner"
            /> */}
            <div className={classes.banner}>Free for you</div>
            <div className={classes.login}>
              Login{" "}
              <span
                style={{ color: "#535766", fontSize: "16px", fontWeight: 400 }}
              >
                or
              </span>{" "}
              Signup
            </div>
            <div>
              <Input />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
