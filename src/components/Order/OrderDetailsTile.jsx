import { Grid, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { useProduct } from "../../context";
import {
  calculateCartValue,
  getFormattedDateTime,
} from "../../utils/utilities";
import { ActionButton } from "../Common";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    border: "1px solid #eaeaec",
    borderRadius: "6px",
    padding: "10px",
  },
  priceRow: {
    justifyContent: "space-between",
    fontSize: "16px",
    textTransform: "capitalize",
    marginBottom: "6px",
  },
  pictureContainer: {
    width: "100px",
    height: "130px",
  },
  picture: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
}));

export const OrderDetailsTile = props => {
  const classes = useStyles();
  const history = useHistory();

  const { productsState, productsDispatch } = useProduct();
  const { details } = props;
  return (
    <div className={classes.root}>
      <Grid container className={classes.container}>
        <div>orderid: {details?._id}</div>
        <div>
          {details?.status === "ACTIVE" ? (
            <span>ARRIVING SOON</span>
          ) : (
            <span>CANCELLED</span>
          )}
        </div>
        <div>Ordered On: {getFormattedDateTime(details?.modifiedOn)}</div>
        <Grid item className={classes.itemContainer}>
          {details?.products?.map((product, id) => (
            <Grid item className={classes.pictureContainer}>
              <img
                srcSet={product?.image[0]}
                loading="lazy"
                className={classes.picture}
                alt="product-img"
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};
