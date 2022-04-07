import axios from "axios";

export const createPaymentIntent = async (authtoken, coupon) => {
  return await axios({
    method: "POST",
    url: `${process.env.REACT_APP_API}create-payment-intent`,
    data: { couponApplied: coupon },
    headers: {
      authtoken,
    },
  });
};
