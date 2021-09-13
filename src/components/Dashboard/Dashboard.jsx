import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import { Header, Footer, Slider } from "../Common";
import { ProductsList } from "../../components";
import { MenBanner, KidsBanner, WomenBanner, BeautyBanner } from "../../images";
import { useEffect, useState } from "react";

import { getAllProducts } from "../../apis/productService";
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

export function Dashboard(params) {
  const classes = useStyles();
  const history = useHistory();
  const path = useLocation();
  console.log(path);
  const banners = [
    {
      src: `${WomenBanner}`,
      //   name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
      onClick: e => {
        history.push("/shop/women");
      },
    },
    {
      src: `${MenBanner}`,
      onClick: e => {
        history.push("/shop/men");
      },
    },
    {
      src: `${KidsBanner}`,
      onClick: e => {
        history.push("/shop/kids");
      },
    },
    {
      src: `${BeautyBanner}`,
      onClick: e => {
        history.push("/shop/beauty");
      },
    },
  ];

  const [products, setProducts] = useState([]);
  function loadList() {
    let requestParams = {};

    if (path.pathname === "/shop/women") {
      requestParams.section = "women";
    } else if (path.pathname === "/shop/men") {
      requestParams.section = "men";
    } else if (path.pathname === "/shop/kids") {
      requestParams.section = "kids";
    }
    // {
    // section: "women",
    // category: "jacket",
    // brand: "shineMore",
    // color: "black",
    // }
    getAllProducts(requestParams)
      .then(function (res) {
        setProducts(res.data.data);
        // notesDispatch({ type: "GET_NOTES", payload: res.data.data });
      })
      .catch(err => {});
  }
  useEffect(
    () => {
      loadList();
    },
    // eslint-disable-next-line
    [path.pathname]
  );
  return (
    <div>
      <Header />

      <div
        className={classes.sliderContainer}
        // onMouseEnter={() => setPlay(true)}
        // onMouseLeave={() => setPlay(false)}
      >
        <Slider
          className={classes.imageSlider}
          sliderItems={banners}
          sliderType="fade"
          sliderAutoPlay={true}
          sliderStopOnHover={false}
          slideNavigatorsHide={true}
          sliderIndicators
          sliderIndicatorsStyle={{
            padding: "10px",
          }}
          // sliderActiveIndicator={{
          //   color: "pink",
          // }}
        />
      </div>

      <ProductsList products={products} />
      <Footer />
    </div>
  );
}
