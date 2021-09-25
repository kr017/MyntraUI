import { Grid, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { useProduct } from "../../context";
import { calculateCartValue } from "../../utils/utilities";
import { ActionButton } from "../Common";

export const OrderTile = () => {
  const classes = useStyles();
  const history = useHistory();

  const { productsState, productsDispatch } = useProduct();

  return "";
};
