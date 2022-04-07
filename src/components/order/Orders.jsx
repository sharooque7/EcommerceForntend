import React from "react";

import ShowPaymentInfo from "../carts/ShowPaymentInfo";

const Orders = ({ orders, handleStatusChange }) => (
  <>
    {orders.map((order) => (
      <div key={order._id} className="row pb-5 mx-3">
        <div className="btn btn-block bg-light">
          <ShowPaymentInfo order={order} showStatus={false} />
          <div className="row">
            <div className="col-md-2 my-4">Delivery Status</div>
            <div className="col-md-8 my-4">
              <select
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                className="form-control"
                defaultValue={order.orderStatus}
                name="status"
                style={{ cursor: "pointer" }}
              >
                <option value="Not Processed">Not Processed</option>
                <option value="Processing">Processing</option>
                <option value="Cash On Delivery">Cash On Delivery</option>
                <option value="Dispatched">Dispatched</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    ))}
  </>
);

export default Orders;
