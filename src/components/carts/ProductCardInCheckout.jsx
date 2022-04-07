import React from "react";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import ModalImage from "react-modal-image";
import laptop from "../../images/laptop.jpg";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ProductCardInCheckout = ({ product }) => {
  const colors = ["Black", "Brown", "Silver", "White", "Blue"];
  const dispatch = useDispatch();
  const handleColor = (e) => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
    }

    cart.forEach((p, i) => {
      if (p._id === product._id) {
        cart[i].color = e.target.value;
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    dispatch({
      type: "ADD_TO_CART",
      payload: cart,
    });
  };

  const handleQuantityChange = (e) => {
    let count = e.target.value < 1 ? 1 : e.target.value;
    if (count > product.quantity) {
      toast.error("Max available quantity", product.quantity);
      return;
    }
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
    }

    cart.forEach((p, i) => {
      if (p._id === product._id) {
        cart[i].count = count;
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    dispatch({
      type: "ADD_TO_CART",
      payload: cart,
    });
  };

  const handleRemove = (e) => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
    }

    cart.forEach((p, i) => {
      if (p._id === product._id) {
        cart.splice(i, 1);
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    dispatch({
      type: "ADD_TO_CART",
      payload: cart,
    });
  };
  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: "140px", height: "auto" }}>
            {product.images ? (
              <ModalImage
                small={product.images[0].url}
                large={product.images[0].url}
              />
            ) : (
              <ModalImage small={laptop} large={laptop} />
            )}
          </div>
        </td>
        <td>Images</td>
        <td>{product.title}</td>
        <td>{product.price}</td>
        <td>{product.brand}</td>
        <td>
          <select className="form-group" onChange={handleColor} name="color">
            {product.color ? (
              <option value={product.color}>{product.color}</option>
            ) : (
              <option>Select</option>
            )}
            {colors
              .filter((c) => c !== product.color)
              .map((c) => (
                <option value={c} key={c}>
                  {c}
                </option>
              ))}
          </select>
        </td>
        <td className="text-center">
          <input
            type="number"
            className="form-control"
            value={product.count}
            onChange={handleQuantityChange}
          />
        </td>
        <td>
          {product.shipping === "Yes" ? (
            <CheckCircleOutlined className="text-success" />
          ) : (
            <CloseCircleOutlined className="text-danger" />
          )}
        </td>
        <td className="text-center">
          <CloseOutlined
            onClick={handleRemove}
            className="text-danger pointer"
          />
        </td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;
