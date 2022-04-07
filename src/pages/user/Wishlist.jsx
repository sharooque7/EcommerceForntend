import React, { useState, useCallback, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import {
  getWishList,
  removeWishList,
  // addToWishList,
} from "../../functions/user";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";

const Whislist = () => {
  const [wishList, setWishList] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  const loadWishList = useCallback(() => {
    getWishList(user.token).then((res) => {
      console.log("-----", res.data.wishlist);
      setWishList(res.data.wishlist);
    });
  }, [user.token]);

  const handleRemove = (productId) =>
    removeWishList(productId, user.token).then((res) => {
      loadWishList();
    });

  useEffect(() => {
    loadWishList();
  }, [loadWishList]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col md-2">
          {" "}
          <UserNav />
        </div>
        <div className="col-md-10 my-3">
          <h4>WishList</h4>

          {wishList.map((p) => (
            <div key={p._id} className="col-md-12 alert alert-secondary px-4">
              <Link to={`/product/${p.slug}`}>{p.title}</Link>
              <span
                className="btn btn-sm float-end text-danger"
                onClick={() => handleRemove(p._id)}
              >
                <DeleteOutlined />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Whislist;
