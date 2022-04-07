import React from "react";
import { Link } from "react-router-dom";

const ProductListItems = ({ product }) => {
  const { price, category, subs, shipping, color, brand, quantity, sold } =
    product;
  return (
    <ul className="list-group listItem">
      <li className="list-group-item">
        Price
        <span className="float-end">$ {price}</span>
      </li>
      {category && (
        <li className="list-group-item">
          Category
          <Link
            style={{ textDecoration: "none", color: "green" }}
            to={`/category/${category.slug}`}
            className="float-end"
          >
            {category.name}
          </Link>
        </li>
      )}

      {subs && (
        <li className="list-group-item">
          Sub Categories
          {subs.map((s) => (
            <Link
              style={{ textDecoration: "none", color: "green" }}
              key={s._id}
              to={`/subs/${s.slug}`}
              className="float-end"
            >
              {s.name}
            </Link>
          ))}
        </li>
      )}

      <li className="list-group-item">
        Shipping
        <span className="float-end">{shipping}</span>
      </li>

      <li className="list-group-item">
        Color
        <span className="float-end"> {color}</span>
      </li>

      <li className="list-group-item">
        Brand
        <span className="float-end"> {brand}</span>
      </li>
      <li className="list-group-item">
        Available
        <span className="float-end"> {quantity}</span>
      </li>

      <li className="list-group-item">
        Sold
        <span className="float-end"> {sold}</span>
      </li>
    </ul>
  );
};

export default ProductListItems;
