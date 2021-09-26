import { Grid, makeStyles } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { useLogin } from "../../context";
import { ActionButton } from "../Common";
import { AddressForm } from "../../components";
import { useState } from "react";
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

export const AddressTile = props => {
  const classes = useStyles();
  const history = useHistory();

  const { userState, userDispatch } = useLogin();

  const [showAddressForm, setShowAddressForm] = useState(false);
  return (
    <div>
      {userState?.addresses?.length > 0 ? (
        <Grid container className={classes.root}>
          <Grid className={classes.address}>
            Deliver to:{" "}
            <span className={classes.name}>
              {userState?.addresses[0]?.name}
              {", "}
              {userState?.addresses[0]?.zip}{" "}
            </span>
            <div>
              {userState?.addresses[0]?.street}
              {", "}
              {userState?.addresses[0]?.city}
              {", "}
              {userState?.addresses[0]?.state}
            </div>
          </Grid>
          <Grid>
            <ActionButton
              kind="SIMPLE_OUTLINED"
              label="change address"
              handleClick={() => {
                props?.handleChangeAddressClick();
              }}
            />
          </Grid>
        </Grid>
      ) : (
        <Grid>
          <Grid>Add address to deliver order</Grid>
          <Grid>
            <ActionButton
              kind="SIMPLE_OUTLINED"
              label="add address"
              handleClick={() => {
                setShowAddressForm(true);
              }}
            />
          </Grid>
        </Grid>
      )}

      {/* address form */}
      {showAddressForm && (
        <AddressForm
          onAddressClose={() => {
            setShowAddressForm(false);
          }}
        />
      )}
    </div>
  );
};
