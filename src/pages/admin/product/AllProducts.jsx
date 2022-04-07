import React, { useCallback, useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { getProductsByCount, removeProduct } from "../../../functions/product";
import AdminProductCart from "../../../components/carts/AdminProductCart";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  let { user } = useSelector((state) => ({ ...state }));

  const loadAllProducts = useCallback(() => {
    setLoading(true);
    getProductsByCount(100)
      .then((res) => {
        setLoading(false);
        setProducts(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  useEffect(() => {
    loadAllProducts();
  }, [loadAllProducts]);

  const handleRemove = (slug) => {
    //setLoading(true);
    if (window.confirm("Delete?")) {
      console.log(slug);
      removeProduct(slug, user.token)
        .then((res) => {
          loadAllProducts();
          toast.error(`${res.data.title} is deleted`);
        })
        .catch((error) => {
          if (error.response.status === 400) toast.error(error.response.data);
        });
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          {" "}
          <AdminNav />
        </div>

        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading....</h4>
          ) : (
            <h4>All Products</h4>
          )}
          <div className="row">
            {products.map((product) => (
              <div className="col-md-4 pb-3" key={product._id}>
                <AdminProductCart
                  handleRemove={handleRemove}
                  product={product}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
