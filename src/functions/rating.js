import React from "react";
import StarRatings from "react-star-ratings";

export const ShowAverage = (p) => {
  if (p && p.rating) {
    let ratingArray = p && p.rating;
    let total = [];
    let length = ratingArray.length;
    ratingArray.map((r) => total.push(r.star));
    let totalReduced = total.reduce((p, n) => p + n, 0);
    let highest = length * 5;

    let result = (totalReduced * 5) / highest;

    return (
      <div className="text-center pt-1 pb-3">
        <span>
          <StarRatings
            starDimension="20px"
            starSpacing="2px"
            starRatedColor="red"
            editing={false}
            rating={result}
          />
          ({p.rating.length})
        </span>
      </div>
    );
  }
};
