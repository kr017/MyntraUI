import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ClearIcon from "@material-ui/icons/Clear";

import { useLogin, useProduct } from "../../context";
import {
  addItemToCart,
  removeItemFromWishlist,
} from "../../apis/productService";
import { SnackbarView } from "../Common";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

const useStyles = makeStyles(theme => ({
  root: {
    width: "210px",
    position: "relative",
    margin: "0px 10px 30px",
    boxSizing: "border-box",
    border: "1px solid #e9e9eb",
    "& .brandName": {
      fontWeight: "500",
    },
    "& .productName": {
      textTransform: "capitalize",
    },

    "& .productInfo": {
      borderBottom: "1px solid #e9e9eb",
      borderTop: "1px solid #e9e9eb",
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
    width: "100%",
    height: "280px",
  },
  picture: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  actionArea: {
    textTransform: "uppercase",
    color: "#ff3e6c",
    fontSize: "14px",
    fontWeight: 500,
    textAlign: "center",
    padding: "14px 0px",
  },
  clearContainer: {
    position: "absolute",
    top: "0px",
    right: "0px",
  },
}));

export function WishTile(props) {
  const classes = useStyles();
  const history = useHistory();
  const { details } = props;

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { userState } = useLogin();
  const { productsDispatch } = useProduct();

  const handleAddToCart = product => {
    setLoading(true);
    userState.token
      ? addItemToCart({ _id: product._id, quantity: 1 })
          .then(res => {
            productsDispatch({
              type: "SET_CART_ITEMS",
              payload: res.data.data,
            });
            handleRemoveFromWishlist(product._id);
            setMessage(prevState => ({
              ...prevState,
              message: "Product moved to bag.",
              type: "success",
            }));
            setLoading(false);
          })
          .catch(err => {
            setMessage(prevState => ({
              ...prevState,
              message: "Something went wrong please try again",
              type: "error",
            }));
            setLoading(false);
          })
      : useHistory.push("/login");
  };

  const handleRemoveFromWishlist = id => {
    removeItemFromWishlist({ _id: id })
      .then(res => {
        // productsDispatch({
        //   type: "SET_WISHLIST_ITEMS",
        //   payload: res.data?.data,
        // });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleMoveToBag = id => {};
  return (
    <div className={classes.root}>
      {message && message?.type && <SnackbarView message={message} />}
      {loading && <ClipLoader color="#ffffff" loading={true} size={20} />}
      <div className={classes.pictureContainer}>
        <img
          srcSet={details?.image[0]}
          loading="lazy"
          // "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/7546900/2019/1/24/c9be0d6e-30a4-4242-b4e0-1c166b73f2781548320874402-HERENOW-Men-Polo-Collar-T-shirt-4861548320873235-1.jpg"
          className={classes.picture}
          alt="product-img"
        />
        <div className={classes.clearContainer}>
          <span>
            <ClearIcon
              htmlColor="#000"
              onClick={() => {
                handleRemoveFromWishlist(details._id);
              }}
            />
          </span>
        </div>
      </div>

      <div>
        {/* brand */}
        <div className="productInfo">
          <div className="brandName">{details.brand}</div>
          <div className="productName">{details.name}</div>

          <div>
            {/* price */}
            <span className="discountedPrice">
              {"Rs. "} {details.price.offerPrice}{" "}
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
              <span className="offer">({`${details?.price?.offerLabel}`})</span>
            )}
          </div>
        </div>
        <div
          className={classes.actionArea}
          onClick={() => handleAddToCart(details)}
        >
          Move to bag
        </div>
      </div>
    </div>
  );
}
