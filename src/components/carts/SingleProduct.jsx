import React, { useState } from "react";
import { Card, Tooltip, Tabs } from "antd";
import { useHistory } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Laptop from "../../images/laptop.jpg";
import ProductListItems from "../../pages/admin/product/ProductListItems";
import StarRatings from "react-star-ratings";
import RatingModel from "../../components/modals/RatingModel";
import { ShowAverage } from "../../functions/rating";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList } from "../../functions/user";
import { toast } from "react-toastify";

const { TabPane } = Tabs;

const SingleProduct = ({ product, star, onStartClick }) => {
  const [tooltip, setTooltip] = useState("Click to add");
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const history = useHistory();
  const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      // console.log('unique', unique)
      localStorage.setItem("cart", JSON.stringify(unique));
      // show tooltip
      setTooltip("Added");

      // add to reeux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      // show cart items in side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };
  const { title, images, description } = product;

  const handleClickToWishList = (e) => {
    e.preventDefault();
    addToWishList(product._id, user.token).then((res) => {
      console.log("Adde to WishList");
      toast.success("Added to WishList");
      history.push("/user/wishlist");
    });
  };
  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop interval={2000}>
            {images &&
              images.map((i) => (
                <img src={i.url} key={i.public_id} alt={i.public_id} />
              ))}
          </Carousel>
        ) : (
          <Card
            cover={
              <img alt="Laptop" src={Laptop} className="mb-1 card-image" />
            }
          ></Card>
        )}
        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call us on 97777XXXXXX for more details
          </TabPane>
        </Tabs>
      </div>
      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>
        {product && product.rating && product.rating.length > 0 ? (
          ShowAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3">No rating yet</div>
        )}
        <Card
          actions={[
            <>
              <Tooltip title={tooltip}>
                <button
                  style={style}
                  className="btn btn-link btn-sm text-muted"
                  onClick={handleAddToCart}
                >
                  {" "}
                  <ShoppingCartOutlined
                    // onClick={() => {
                    //   handleRemove(slug);
                    // }}
                    className="text-danger"
                  />{" "}
                  <br /> Add to Cart
                </button>
              </Tooltip>
            </>,
            <button
              style={style}
              className="btn btn-link btn-sm text-muted"
              onClick={handleClickToWishList}
            >
              <HeartOutlined className="text-info" />
              <br />
              Add to WishList
            </button>,
            <RatingModel>
              <StarRatings
                name={product._id}
                numberOfStars={5}
                rating={star}
                changeRating={onStartClick}
                isSelectable={true}
                starRatedColor="red"
              />
            </RatingModel>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
const style = {
  backgroundColor: "none !important",
  border: "none",
  padding: "0 !important",
  /*optional*/
  fontFamily: "arial, sans-serif",
  color: "black",
  textDecoration: "none",
  cursor: "pointer",
};
