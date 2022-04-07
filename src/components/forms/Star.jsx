import React from "react";
import StarRatings from "react-star-ratings";

const Star = ({ starClick, numberOfStars }) => (
  <>
    <StarRatings
      changeRating={() => {
        starClick(numberOfStars);
      }}
      numberOfStars={numberOfStars}
      starSpacing="2px"
      starDimension="20px"
      starHoverColor="red"
      starEmptyColor="red"
    />
  </>
);

export default Star;
