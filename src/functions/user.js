import axios from "axios";

export const userCart = async (cart, authtoken) =>
  await axios({
    method: "POST",
    url: `${process.env.REACT_APP_API}user/cart`,
    data: { cart },
    headers: { authtoken: authtoken },
  });

export const getUserCart = async (authtoken) =>
  await axios({
    method: "GET",
    url: `${process.env.REACT_APP_API}user/cart`,
    headers: { authtoken: authtoken },
  });

export const emptyUserCart = async (authtoken) =>
  await axios({
    method: "DELETE",
    url: `${process.env.REACT_APP_API}user/cart`,
    headers: { authtoken: authtoken },
  });

export const saveUserAddress = async (authtoken, address) =>
  await axios({
    method: "POST",
    url: `${process.env.REACT_APP_API}user/address`,
    data: { address },
    headers: { authtoken: authtoken },
  });

export const applyCoupon = async (authtoken, coupon) =>
  await axios({
    method: "POST",
    url: `${process.env.REACT_APP_API}user/cart/coupon`,
    data: { coupon },
    headers: { authtoken: authtoken },
  });

export const createOrder = async (stripeResponse, authtoken) =>
  await axios({
    method: "POST",
    url: `${process.env.REACT_APP_API}user/order`,
    data: { stripeResponse },
    headers: { authtoken: authtoken },
  });

export const getUserOrders = async (authtoken) =>
  await axios({
    method: "GET",
    url: `${process.env.REACT_APP_API}user/orders`,
    headers: { authtoken: authtoken },
  });

export const getWishList = async (authtoken) =>
  await axios({
    method: "GET",
    url: `${process.env.REACT_APP_API}user/wishlist`,
    headers: { authtoken: authtoken },
  });

export const removeWishList = async (productId, authtoken) =>
  await axios({
    method: "PUT",
    url: `${process.env.REACT_APP_API}user/wishlist/${productId}`,

    headers: { authtoken: authtoken },
  });

export const addToWishList = async (productId, authtoken) =>
  await axios({
    method: "POST",
    url: `${process.env.REACT_APP_API}user/wishlist`,
    data: { productId },
    headers: { authtoken: authtoken },
  });

export const createCashOrder = async (authtoken, COD, coupon) => {
  return await axios({
    method: "POST",
    url: `${process.env.REACT_APP_API}user/cash-order`,
    data: { COD, couponApplied: coupon },
    headers: {
      authtoken,
    },
  });
};
