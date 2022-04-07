import axios from "axios";

export const getCoupons = async (authtoken) => {
  return await axios({
    method: "GET",
    url: `${process.env.REACT_APP_API}coupons`,
    headers: { authtoken },
  });
};

export const removeCoupon = async (couponId, authtoken) => {
  return await axios({
    method: "DELETE",
    url: `${process.env.REACT_APP_API}coupons/${couponId}`,
    headers: { authtoken },
  });
};

export const createCoupon = async (coupon, authtoken) => {
  return await axios({
    method: "POST",
    url: `${process.env.REACT_APP_API}coupons`,
    data: { coupon },
    headers: { authtoken },
  });
};
