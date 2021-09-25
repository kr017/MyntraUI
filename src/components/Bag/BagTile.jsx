import { useHistory } from "react-router-dom";

import { Grid, makeStyles } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { removeItemFromCart } from "../../apis/productService";
const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    border: "1px solid #eaeaec",
    borderRadius: "6px",
    padding: "10px",
  },
  itemContainer: {
    display: "flex",
  },
  root: {
    paddingBottom: "10px",

    "& .brandName": {
      fontWeight: "500",
    },
    "& .productName": {
      textTransform: "capitalize",
    },

    "& .productRatingContainer": {
      position: "absolute",
      height: "18px",
      top: "260px",
      backgroundColor: "#ffffffcc",
      padding: "0 0 0 4px",
      borderRadius: "2px",
      marginLeft: "10px",
      fontWeight: "500",
      fontSize: "12px",
      display: "flex",
      alignItems: "center",
    },
    "& .productRatingCount": {
      paddingRight: "4px",
      display: "flex",
      marginLeft: "4px",
    },
    "& .seperator": {
      fontSize: "10px",
      margin: "-.5px 6px 0 -2px",
    },
    "& .productInfo": {
      marginTop: "13px",
      padding: "0px 10px",
    },
    "& .discountedPrice": {
      color: "#282c3f",
      fontWeight: "500",
      fontSize: "14px",
    },
    "& .price": {
      color: "#7e818c",
      marginLeft: "5px",
      fontWeight: "400",
      fontSize: "12px",
    },
    "& .offer": {
      color: "#ff905a",
      marginLeft: "5px",
      fontWeight: "400",
      fontSize: "12px",
    },
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
  clearContainer: {
    position: "relative",
  },
}));

export const BagTile = props => {
  const classes = useStyles();
  const history = useHistory();

  const { details } = props;

  return (
    <div className={classes.root}>
      <Grid container className={classes.container}>
        <Grid item className={classes.itemContainer}>
          <Grid item className={classes.pictureContainer}>
            <img
              srcSet={details?.image[0]}
              loading="lazy"
              className={classes.picture}
              alt="product-img"
            />
          </Grid>
          <Grid item>
            {/* brand */}
            <div className="productInfo">
              <div className="brandName">{details.brand}</div>
              <div className="productName">{details.name}</div>

              <div>
                {/* price */}
                <span className="discountedPrice">
                  {`\u20B9`} {details.price.offerPrice}{" "}
                </span>{" "}
                {/* mrp */}
                {details?.price?.MRP && (
                  <strike className="price">
                    {"Rs. "}
                    {details?.price?.MRP}
                  </strike>
                )}
                {/* discountLabel */}
                {details?.price?.offerLabel && (
                  <span className="offer">
                    ({`${details?.price?.offerLabel}`})
                  </span>
                )}
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid item>
          <div className={classes.clearContainer}>
            <span>
              <ClearIcon
                htmlColor="#9F9F9F"
                onClick={() => {
                  removeItemFromCart({ _id: details._id })
                    .then(res => {
                      console.log(res.data);
                    })
                    .catch(err => {
                      console.log(err);
                    });
                }}
              />
            </span>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
