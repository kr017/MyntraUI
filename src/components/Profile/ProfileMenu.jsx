import { Button, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  actionBtn: {
    color: "#ff3f6ccc",

    "&:hover": {
      border: "1px solid red",
    },
  },
}));
export default function UserInfoMenu(props) {
  const classes = useStyles();
  return (
    <div>
      <Grid>Welcome</Grid>
      To access account and manage orders
      <Button className={classes.actionBtn}>login/ signup</Button>
      Orders Wishlist Gift Cards Contact Us Myntra InsiderNew Myntra Credit
      Coupons Saved Cards Saved Addresses
    </div>
  );
}
