import { Grid, makeStyles } from "@material-ui/core";

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
  itemContainer: {
    display: "flex",
    flexDirection: "row",
  },
  pictureContainer: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    margin: "4px",
    border: "1px solid lightgray",
  },
  picture: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
}));

export const OrderDetailsTile = props => {
  const classes = useStyles();

  const { details } = props;
  return (
    <div className={classes.root}>
      <Grid className={classes.container}>
        {/* <div>orderid: {details?._id}</div> */}
        <Grid style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <b>Ordered On: </b>
            <div>{getFormattedDateTime(details?.modifiedOn)}</div>
          </div>{" "}
          <div>
            {details?.status === "ACTIVE" ? (
              <span
                style={{
                  background: "#20BD99",
                  padding: "2px 4px",
                  borderRadius: "4px",
                }}
              >
                ARRIVING SOON
              </span>
            ) : (
              <span
                style={{
                  background: "#f1360b",
                  padding: "2px 4px",
                  borderRadius: "4px",
                }}
              >
                CANCELLED
              </span>
            )}
          </div>
        </Grid>
        <Grid className={classes.itemContainer}>
          {details?.products?.map((product, id) => (
            <div item className={classes.pictureContainer}>
              <img
                srcSet={product?.image[0]}
                loading="lazy"
                className={classes.picture}
                alt="product-img"
                style={{ borderRadius: "50%" }}
              />
            </div>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};
