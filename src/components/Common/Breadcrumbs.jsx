import { makeStyles } from "@material-ui/core/styles";
import BreadcrumbMaterial from "@material-ui/core/Breadcrumbs";

import withBreadcrumbs from "react-router-breadcrumbs-hoc";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  container: {
    padding: "20px 0px",
  },
  list: {
    listStyle: "none",
    display: "inline-block",
    "&:after": {
      content: "›",
      display: "inline",
      fontSize: "1.2em",
      color: "#AAA",
      padding: "0 .0725em 0 .15em",
    },
  },
  link: {
    textDecoration: "none",
  },
}));
const userNamesById = {
  "612a5bbe8851e63034f5c07d": "John",
  2: "Mike",
};

const UserBreadcrumb = ({ match }) => {
  // let name = itemsArray.find(item => item.productId._id === id);
  return null; //<span>{match.params.userId}</span>; // use match param userId to fetch/display user name
};
const routes = [
  { path: "/shop/:productId", breadcrumb: UserBreadcrumb },
  { path: "/shop/kids", breadcrumb: "Kids" },
  { path: "/shop/women", breadcrumb: "Women" },
];
const Breadcrumbs = props => {
  const classes = useStyles();

  return (
    // <div className={classes.container}>
    <BreadcrumbMaterial aria-label="breadcrumb">
      {props?.breadcrumbs?.map(({ match, breadcrumb }) => (
        <li
          key={match.url}
          // className={classes.list}
        >
          <NavLink to={match.url} className={classes.link}>
            {breadcrumb}
          </NavLink>
        </li>
      ))}
    </BreadcrumbMaterial>
  );
};

export default withBreadcrumbs(routes)(Breadcrumbs);
