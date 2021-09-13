import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import { ProductTile } from "../../components";
const useStyles = makeStyles(theme => ({
  sliderContainer: {
    // marginTop: "20px",
    marginBottom: "15px",
  },
  imageSlider: {
    // width: "100%",
    // maxWidth: "200px",
    maxHeight: "450px",
    height: "450px",
    cursor: "pointer",
  },
}));

export function ProductsList(props) {
  const classes = useStyles();
  const history = useHistory();
  const { products } = props;
  return (
    <div>
      {products ? (
        <Grid container>
          {products.map((product, id) => (
            <Grid item key={id}>
              <ProductTile
                details={product}
                //    play={play}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid style={{ padding: "100px" }}>Products No products</Grid>
      )}
    </div>
  );
}
