/**
 * 
 * @param {*} ratings 
 * 
 * [{label: "5", value: 5, totalCount: "130"}]

 */
const ratingCalculator = ratings => {
  let totalRatings = 0;
  let total = 0;
  ratings.forEach(rating => {
    total = total + rating?.totalCount;
    totalRatings = totalRatings + rating?.totalCount * rating?.value;
  });

  let calculatedRating = (totalRatings / total).toFixed(1);
  return [calculatedRating, total];
};

/**
 *
 * @param {*} path
 * @returns
 */
const getCurrentSection = path => {
  let section = "";
  if (path.pathname === "/shop/women") {
    section = "women";
  } else if (path.pathname === "/shop/men") {
    section = "men";
  } else if (path.pathname === "/shop/kids") {
    section = "kids";
  } else {
    section = "dashboard";
  }
  return section;
};

/**
 *
 *
 */
const isItemAdded = (list, id) => {
  if (list) {
    return list.find(item => {
      return item?._id === id;
    });
  }
  return false;
};

/**
 *
 *
 */
const calculateCartValue = cart => {
  let totalMRP = 0,
    totalDiscountOnMRP = 0,
    convenienceFee = false,
    totalAmount = 0;

  cart.forEach(ele => {
    let mrp = 0;
    if (ele?.price?.MRP) {
      mrp = ele?.price?.MRP;
    } else {
      mrp = ele.price?.offerPrice;
    }
    totalMRP = parseFloat(totalMRP) + parseFloat(mrp);
    totalAmount = parseFloat(totalAmount) + parseFloat(ele.price?.offerPrice);
  });
  totalDiscountOnMRP = parseFloat(totalMRP) - parseFloat(totalAmount);
  if (cart.length === 1) {
    convenienceFee = true;
    totalAmount = parseFloat(totalAmount) + 99;
  }
  return [totalMRP, totalDiscountOnMRP, convenienceFee, totalAmount];
  //totalMRP  //totalDiscountOnMRP //convenienceFee //totalAmount
};

/**
 *
 *
 */

const getFormattedDateTime = date => {
  let d = new Date(date);

  d = d.toLocaleString("en-US", {
    weekday: "short", // long, short, narrow
    day: "numeric", // numeric, 2-digit
    year: "numeric", // numeric, 2-digit
    month: "long", // numeric, 2-digit, long, short, narrow
    hour: "numeric", // numeric, 2-digit
    minute: "numeric", // numeric, 2-digit
    second: "numeric", // numeric, 2-digit
  });

  return d;
};

export {
  ratingCalculator,
  getCurrentSection,
  isItemAdded,
  calculateCartValue,
  getFormattedDateTime,
};
