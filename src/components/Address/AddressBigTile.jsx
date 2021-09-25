import { Grid, makeStyles } from "@material-ui/core";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useLogin } from "../../context";
import { ActionButton } from "../Common";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    border: "1px solid #eaeaec",
    borderRadius: "6px",
    padding: "10px",
    marginBottom: "10px",
  },
  address: {
    fontSize: "14px",
    textTransform: "capitalize",
  },
  name: {
    fontWeight: 600,
  },
}));

export const AddressBigTile = props => {
  const classes = useStyles();
  const history = useHistory();
  const address = props.address;
  const { userState, userDispatch } = useLogin();
  const [value, setValue] = useState(
    userState?.selectedAddress?._id
      ? userState?.selectedAddress?._id
      : userState?.addresses[0]?._id
  );
  console.log(userState, value);
  const handleChange = (address, id) => {
    setValue(id);
    userDispatch({
      type: "SET_SELECTED_ADDRESS",
      payload: address,
    });
  };
  return (
    <div>
      <Grid container>
        <Grid item>
          {" "}
          <input
            type="radio"
            name="address"
            checked={address?._id === value}
            onChange={() => handleChange(address, address._id)}
          />
          {address?.name}
        </Grid>{" "}
        <Grid item>
          <Grid>
            {address?.street}
            {", "}
          </Grid>
          <Grid>
            {address?.city}
            {" - "}
            {address?.zip}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
