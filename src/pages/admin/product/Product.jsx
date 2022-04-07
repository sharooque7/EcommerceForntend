import React, { useCallback, useEffect, useState } from "react";
import {
  getProduct,
  getRelated,
  productStar,
} from "../../../functions/product";
import SingleProduct from "../../../components/carts/SingleProduct";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ProductCart from "../../../components/carts/ProductCart";
const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0);
  const [relates, setRelates] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));
  const slug = match.params.slug;

  const loadSingleProduct = useCallback(() => {
    getProduct(slug).then((res) => {
      setProduct(res.data);
      getRelated(res.data._id).then((res) => setRelates(res.data));
    });
  }, [slug]);

  useEffect(() => {
    loadSingleProduct();
  }, [slug, loadSingleProduct]);

  useEffect(() => {
    if (product.rating && user) {
      let existingRatingObject = product.rating.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star);
    }
  }, [product.rating, user]);
  ///Children of product page
  const onStartClick = (newRating, name) => {
    console.log();
    setStar(newRating);
    productStar(name, newRating, user.token)
      .then((res) => {
        loadSingleProduct();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct
          product={product}
          onStartClick={onStartClick}
          star={star}
        />
      </div>
      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          Related Products
          <hr />
        </div>
      </div>
      <div className="row pb-5">
        {relates.length ? (
          relates.map((p) => (
            <div className="col-md-3" key={p._id}>
              <ProductCart product={p} />
            </div>
          ))
        ) : (
          <div className="text-center col-md-4">"No producst found"</div>
        )}
      </div>
    </div>
  );
};

export default Product;
