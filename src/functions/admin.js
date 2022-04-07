import axios from "axios";

export const getOrders = async (authtoken) =>
  await axios({
    method: "GET",
    url: `${process.env.REACT_APP_API}admin/orders`,
    headers: {
      authtoken,
    },
  });

export const changeStatus = async (orderId, orderStatus, authtoken) =>
  await axios({
    method: "PUT",
    url: `${process.env.REACT_APP_API}admin/order-status/`,
    data: { orderId, orderStatus },
    headers: {
      authtoken,
    },
  });
