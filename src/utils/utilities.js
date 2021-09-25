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
export { ratingCalculator, getCurrentSection, isItemAdded };
