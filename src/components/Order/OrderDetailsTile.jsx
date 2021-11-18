import { Grid, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { useProduct } from "../../context";
import { getFormattedDateTime } from "../../utils/utilities";

const useStyles = makeStyles(theme => ({
  root: {},
  container: {
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

  const { details } = props;
  return (
    <div className={classes.root}>
      <Grid className={classes.container}>
        {/* <div>orderid: {details?._id}</div> */}
        <Grid>
          <div>
            <b>Status: </b>
            {details?.status === "ACTIVE" ? (
              <span>ARRIVING SOON</span>
            ) : (
              <span>CANCELLED</span>
            )}
          </div>
          <div>
            <b>Ordered On: </b>
            {getFormattedDateTime(details?.modifiedOn)}
          </div>
        </Grid>
        <Grid className={classes.itemContainer}>
          {details?.products?.map((product, id) => (
            <Grid container>
              <Grid item className={classes.pictureContainer}>
                <img
                  srcSet={product?.image[0]}
                  loading="lazy"
                  className={classes.picture}
                  alt="product-img"
                />
              </Grid>
              <Grid>
                <div className={classes.brandName}>{product.brand}</div>
                <div className={classes.productName}>{product.name}</div>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};
