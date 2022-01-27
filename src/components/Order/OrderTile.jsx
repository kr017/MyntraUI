import { Grid, makeStyles } from "@material-ui/core";

import { useProduct } from "../../context";
import { calculateCartValue } from "../../utils/utilities";

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
  strike: {
    marginRight: "4px",
  },
  discount: {
    color: "#20BD99",
  },
}));

export const OrderTile = () => {
  const classes = useStyles();

  const { productsState } = useProduct();

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

            {calculateCartValue(productsState?.cartItems)[0]}
          </Grid>
        </Grid>

        <Grid container className={classes.priceRow}>
          <Grid>Discount on MRP</Grid>
          <Grid className={classes.discount}>
            -{`\u20B9`}
            {calculateCartValue(productsState?.cartItems)[1]}
          </Grid>
        </Grid>

        {/* <Grid container className={classes.priceRow}>
          <Grid>Coupon Discount</Grid>
          <Grid>Apply Coupon</Grid>
        </Grid>
         */}

        <Grid container className={classes.priceRow}>
          <Grid>Convenience Fee</Grid>
          <Grid>
            {`\u20B9`}
            {!calculateCartValue(productsState?.cartItems)[2] ? (
              <>
                <strike className={classes.strike}>99</strike>
                <span className={classes.discount}>FREE</span>
              </>
            ) : (
              99
            )}
          </Grid>
        </Grid>

        <Grid
          container
          className={`${classes.priceRow} ${classes.totalAmount}`}
        >
          <Grid>Total Amount</Grid>
          <Grid>
            {`\u20B9`}
            {calculateCartValue(productsState?.cartItems)[3]}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
