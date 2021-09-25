import { Grid, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { useProduct } from "../../context";
import { ActionButton } from "../Common";

const useStyles = makeStyles(theme => ({
  titleContainer: {
    textTransform: "capitalize",
    fontSize: "14px",
    fontWeight: 600,
    padding: "15px 0px",
  },
  title: {
    textTransform: "uppercase",
  },
  priceRow: {
    justifyContent: "space-between",
    fontSize: "16px",
    textTransform: "capitalize",
    marginBottom: "6px",
  },
  totalAmount: {
    fontSize: "18px",
    fontWeight: 600,
    marginTop: "10px",
    paddingTop: "8px",
    borderTop: "1px solid #eaeaec",
  },
}));

export const OrderTile = () => {
  const classes = useStyles();
  const history = useHistory();

  const { productsState, productsDispatch } = useProduct();

  return (
    <div className={classes.root}>
      <div className={classes.titleContainer}>
        <span className={classes.title}>price details</span> (
        {productsState?.cartItems?.length} Item)
      </div>
      <div>
        <Grid container className={classes.priceRow}>
          <Grid>Total MRP</Grid>
          <Grid>
            {`\u20B9`}
            {12231}
          </Grid>
        </Grid>
        <Grid container className={classes.priceRow}>
          <Grid>Discount on MRP</Grid>
          <Grid>
            {`\u20B9`}
            {12231}
          </Grid>
        </Grid>
        <Grid container className={classes.priceRow}>
          <Grid>Coupon Discount</Grid>
          <Grid>Apply Coupon</Grid>
        </Grid>
        <Grid container className={classes.priceRow}>
          <Grid>Convenience Fee</Grid>
          <Grid>
            {`\u20B9`}
            {99}
          </Grid>
        </Grid>

        <Grid
          container
          className={`${classes.priceRow} ${classes.totalAmount}`}
        >
          <Grid>Total Amount</Grid>
          <Grid>
            {`\u20B9`}
            {99}
          </Grid>
        </Grid>

        <ActionButton
          kind="SIMPLE_PRIMARY"
          label="Place Order"
          handleClick={() => history.push("/checkout/address")}
        />
      </div>
    </div>
  );
};
