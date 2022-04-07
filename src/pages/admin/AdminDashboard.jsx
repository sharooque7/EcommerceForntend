import React, { useCallback, useEffect, useState } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import { getOrders, changeStatus } from "../../functions/admin";
import { toast } from "react-toastify";
import Orders from "../../components/order/Orders";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  const loadOrders = useCallback(() => {
    getOrders(user.token).then((res) => {
      setOrders(res.data);
    });
  }, [user.token]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success("Status updated");
      loadOrders();
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 text-center my-3">
          {" "}
          <AdminNav />
        </div>

        <div className="col my-3">
          <h4>Admin DashBoard </h4>
          <Orders orders={orders} handleStatusChange={handleStatusChange} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
