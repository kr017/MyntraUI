import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import { Grid } from "@material-ui/core";

import { Header, Footer, WishTile } from "../../components";
import { Loader } from "../../components/Common";

import { useLogin, useProduct } from "../../context";

const useStyles = makeStyles(theme => ({
  root: {},
}));
export const WishList = () => {
  const classes = useStyles();
  const history = useHistory();

  const [products, setProducts] = useState([]);
  const { productsState, productsDispatch } = useProduct();
  const { userState } = useLogin();

  const [loading, setLoading] = useState(false);
  const loadList = () => {};
  useEffect(
    () => {
      loadList();
    },
    // eslint-disable-next-line
    []
  );
  return (
    <div>
      <Header />

      <div>
        <div>{productsState.wishlistItems?.length}</div>
        {productsState.wishlistItems ? (
          <Grid container>
            {productsState.wishlistItems.map((wish, id) => (
              <Grid item key={id}>
                <WishTile details={wish} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Loader />
        )}
      </div>

      <Footer />
    </div>
  );
};
