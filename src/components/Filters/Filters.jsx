import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { Grid, ListItem, makeStyles, Typography } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import { useProduct } from "../../context";
import { getAllProducts } from "../../apis/productService";
import { getCurrentSection, isItemAdded } from "../../utils/utilities";

const useStyles = makeStyles(theme => ({
  root: {
    width: "250px",
    maxWidth: "250px",
    minWidth: "250px",
    margin: "10px 0px",

    position: "sticky",
    top: "10px",
    bottom: "auto",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  filterHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #edebef",
    paddingBottom: "15px",
    paddingLeft: "25px",
  },
  filters: {
    fontSize: "16px",
    fontWeight: 600,
    textTransform: "uppercase",
  },
  clearAll: {
    textTransform: "uppercase",
    color: "#ff3f6c",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 500,
  },
  filter: {
    paddingTop: "10px",
    borderBottom: "1px solid #edebef",
  },
  filterLabel: {
    textTransform: "uppercase",
    fontWeight: 600,
    fontSize: "14px",
    color: "#282c3f",
    paddingLeft: "12px",
  },
  filterContainer: { paddingLeft: "15px", borderRight: "1px solid #edebef" },
  listStyle: {
    listStyle: "none",
  },
  checkbox: {
    padding: "0px",
  },
  element: {
    textTransform: "capitalize",
  },
}));

export function Filters() {
  const classes = useStyles();
  // const history = useHistory();
  const path = useLocation();
  const { productsState, productsDispatch } = useProduct();

  const setFiletrs = (label, value, isChecked) => {
    let arrCat = productsState?.selectedFilters?.categories
      ? productsState?.selectedFilters?.categories
      : [];

    let arrBrands = productsState?.selectedFilters?.brands
      ? productsState?.selectedFilters?.brands
      : [];

    let arrColors = productsState?.selectedFilters?.colors
      ? productsState?.selectedFilters?.colors
      : [];

    if (label === "categories") {
      if (isChecked) {
        arrCat.push(value);
      } else {
        const index = arrCat.indexOf(value);
        arrCat.splice(index, 1);
      }
    }
    if (label === "brands") {
      if (isChecked) {
        arrBrands.push(value);
      } else {
        const index = arrBrands.indexOf(value);
        arrBrands.splice(index, 1);
      }
    }
    if (label === "colors") {
      if (isChecked) {
        arrColors.push(value);
      } else {
        const index = arrColors.indexOf(value);
        arrColors.splice(index, 1);
      }
    }
    let obj = {
      section: getCurrentSection(path),
      categories: arrCat,
      brands: arrBrands,
      colors: arrColors,
    };

    getAllProducts(obj)
      .then(function (res) {
        productsDispatch({ type: "SET_PRODUCTS", payload: res.data.data });
        productsDispatch({
          type: "SET_SELECTED_FILTERS",
          payload: obj,
        });
      })
      .catch(err => {});
  };
  return (
    <div className={classes.root}>
      <Grid className={classes.filterHeader}>
        <span className={classes.filters}>filters</span>
        <span className={classes.clearAll}>clear all</span>
      </Grid>
      <Grid className={classes.filterContainer}>
        {productsState?.filters?.categories && (
          <Grid className={classes.filter}>
            <span className={classes.filterLabel}>categories</span>
            {productsState?.filters?.categories?.map((ele, id) => (
              <li className={classes.listStyle}>
                <Checkbox
                  inputProps={{ padding: "0px", margin: "0px" }}
                  onChange={e => {
                    setFiletrs("categories", ele, e.currentTarget.checked);
                  }}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
                <span className={classes.element}>{ele}</span>
              </li>
            ))}
          </Grid>
        )}

        {productsState?.filters?.brands && (
          <Grid className={classes.filter}>
            <span className={classes.filterLabel}>brand</span>
            {productsState?.filters?.brands?.map((ele, id) => (
              <li className={classes.listStyle}>
                <Checkbox
                  // checked={isItemAdded(
                  //   productsState?.selectedFilters?.brands,
                  //   id
                  // )}
                  onChange={e => {
                    setFiletrs("brands", ele, e.currentTarget.checked);
                  }}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
                <span className={classes.element}>{ele}</span>
              </li>
            ))}
          </Grid>
        )}
        {productsState?.filters?.colors && (
          <Grid className={classes.filter}>
            <span className={classes.filterLabel}>Color</span>
            {productsState?.filters?.colors?.map((ele, id) => (
              <li className={classes.listStyle}>
                <Checkbox
                  // checked={true}
                  onChange={e => {
                    setFiletrs("colors", ele, e.currentTarget.checked);
                  }}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
                <span className={classes.element}>{ele}</span>
              </li>
            ))}
          </Grid>
        )}
      </Grid>
    </div>
  );
}
