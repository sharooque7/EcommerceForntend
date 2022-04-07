import React, { useCallback, useEffect, useState } from "react";
import { getProducts, getProductsCount } from "../../functions/product";
import ProductCart from "../carts/ProductCart";
// import Jumbotron from "../carts/Jumbotron";
import LoadingCard from "../carts/LoadingCard";
import { Pagination } from "antd";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  const loadAllProducts = useCallback(() => {
    setLoading(true);
    //sort order limit
    getProducts("sold", "desc", page).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  }, [page]);

  useEffect(() => {
    loadAllProducts();
  }, [loadAllProducts, page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);
  return (
    <>
      {" "}
      {/* <div className="pt-3 text-danger h1 font-weight-bold " style={style}>
        <Jumbotron text={["Latest Products", "New Arrivals", "Best Sellers"]} />
      </div> */}
      <h4 className="text-center p-3 mt-5 mb-5 display-4" style={style}>
        Best Sellers
      </h4>
      <div className="container">
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">
            {products.map((product) => (
              <div className="col-md-4" key={product._id}>
                <ProductCart product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="row">
        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
          {" "}
          <Pagination
            current={page}
            total={(productsCount / 2) * 10}
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div>
    </>
  );
};

const style = {
  padding: "2rem 1rem",
  marginBottom: "2rem",
  backgroundColor: "#e9ecef",
  borderRadius: ".3rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "15vh",
};
export default BestSellers;
