import React from "react";
import { Drawer } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import laptop from "../../images/laptop.jpg";
const SlideDrawer = () => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));

  return (
    <Drawer
      className="text-center"
      title={`${`Cart / ${cart.length} Product`}`}
      placement="right"
      closable={false}
      onClose={() => {
        dispatch({
          type: "SET_VISIBLE",
          payload: false,
        });
      }}
      visible={drawer}
    >
      {cart.map((p) => (
        <div className="row" key={p._id}>
          <div className="col">
            {p.images[0] ? (
              <>
                {" "}
                <img src={p.images[0].url} alt="images" style={imageStyle} />
                <p className="text-center bg-secondary text-light">
                  {p.title} x {p.count}
                </p>
              </>
            ) : (
              <>
                {" "}
                <img src={laptop} alt="images" style={imageStyle} />
                <p className="text-center bg-secondary text-light">
                  {p.title} x {p.count}
                </p>
              </>
            )}
          </div>
        </div>
      ))}
      <Link to="/cart">
        <button
          className="text-center btn btn-secondary btn-raised btn-block"
          onClick={() => {
            dispatch({
              type: "SET_VISIBLE",
              payload: false,
            });
          }}
        >
          Go to Cart
        </button>
      </Link>
    </Drawer>
  );
};

export default SlideDrawer;
const imageStyle = {
  width: "100%",
  height: "50px",
  objectFit: "cover",
};
