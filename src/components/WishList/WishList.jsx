import { useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import { Grid } from "@material-ui/core";

import { Header, Footer, WishTile, ShopNow } from "../../components";
import { Loader } from "../Common";
import { useProduct } from "../../context";
import { EmptyWishlist } from "../../images";

export const WishList = () => {
  const { productsState } = useProduct();

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

      <div style={{ paddingTop: "20px", minHeight: "70vh" }}>
        <>
          {/* {productsState?.wishlistItems ? ( */}
          <>
            {productsState?.wishlistItems?.length > 0 ? (
              <Grid container>
                {productsState?.wishlistItems?.map((wish, id) => (
                  <Grid item key={id}>
                    <WishTile details={wish} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Grid style={{ marginTop: "20px" }}>
                <div style={{ textAlign: "center" }}>
                  <div>
                    <img src={EmptyWishlist} />
                  </div>
                  <div
                    style={{
                      marginBottom: "20px",
                      fontSize: "24px",
                      fontWeight: 600,
                      color: "#ff3f6ccc",
                    }}
                  >
                    It feels so light...
                  </div>
                </div>
                <ShopNow />
              </Grid>
            )}
          </>
          {/* ) : (
            <Loader />
          )} */}
        </>
      </div>

      <Footer />
    </div>
  );
};
