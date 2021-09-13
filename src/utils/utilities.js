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

export { ratingCalculator };
