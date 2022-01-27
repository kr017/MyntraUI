import { useState } from "react";
import { useLogin } from "../../context";

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     border: "1px solid #eaeaec",
//     borderRadius: "6px",
//     padding: "10px",
//     marginBottom: "10px",
//   },
//   address: {
//     fontSize: "14px",
//     textTransform: "capitalize",
//   },
//   name: {
//     fontWeight: 600,
//   },
// }));

export const AddressBigTile = props => {
  const address = props.address;
  const { userState, userDispatch } = useLogin();
  const [value, setValue] = useState(userState?.selectedAddress?._id);

  const handleChange = (address, id) => {
    setValue(id);
    userDispatch({
      type: "SET_SELECTED_ADDRESS",
      payload: address,
    });
  };
  return (
    <div>
      <div>
        {" "}
        <input
          type="radio"
          name="address"
          checked={address?._id === value}
          onChange={() => handleChange(address, address._id)}
        />
        <b style={{ textTransform: "capitalize", paddingLeft: "2px" }}>
          {address?.name}
        </b>
      </div>{" "}
      <div style={{ paddingLeft: "22px", textTransform: "capitalize" }}>
        <div>
          {address?.locality}
          {", "}
          {address?.street}
          {", "}
        </div>
        <div>
          {address?.city}
          {" - "}
          {address?.zip}
        </div>
        <div>{address.state}</div>
      </div>
    </div>
  );
};
