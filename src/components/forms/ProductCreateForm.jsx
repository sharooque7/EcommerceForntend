import React from "react";
import { Select } from "antd";

const { Option } = Select;

const ProductCreateForm = ({
  handleChange,
  handleSubmit,
  values,
  handleCategoryChange,
  setSubOptions,
  show,
  setVales,
  subOptions,
}) => {
  const {
    title,
    description,
    price,
    categories,
    // category,
    subs,
    shipping,
    quantity,
    // images,
    colors,
    brands,
    // color,
    // brand,
  } = values;
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-2 ">
        {" "}
        <label className="mb-1" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          name="title"
          require
          className="form-control"
          value={title}
          onChange={handleChange}
        />
      </div>
      <div className="form-group mb-2">
        {" "}
        <label className="mb-1" htmlFor="description">
          Description
        </label>
        <input
          type="text"
          name="description"
          require
          className="form-control"
          value={description}
          onChange={handleChange}
        />
      </div>

      <div className="form-group mb-2">
        {" "}
        <label className="mb-1" htmlFor="price">
          Price
        </label>
        <input
          pattern="[0-9]*"
          inputMode="numeric"
          type="number"
          name="price"
          require
          className="form-control"
          value={price}
          onChange={handleChange}
          onKeyDown={(evt) =>
            (evt.key === "-" || evt.key === "e" || evt.key === "+") &&
            evt.preventDefault()
          }
        />
      </div>
      <div className="form-group mb-2">
        {" "}
        <label className="mb-1" htmlFor="shipping">
          Shipping
        </label>
        <select
          name="shipping"
          className="form-control"
          onChange={handleChange}
          value={shipping}
        >
          <option>Please Select</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>

      <div className="form-group mb-2">
        {" "}
        <label className="mb-1" htmlFor="quantity">
          Quantity
        </label>
        <input
          pattern="[0-9]*"
          inputMode="numeric"
          type="number"
          name="quantity"
          require
          className="form-control"
          value={quantity}
          onChange={handleChange}
          onKeyDown={(evt) =>
            (evt.key === "-" || evt.key === "e" || evt.key === "+") &&
            evt.preventDefault()
          }
        />
      </div>

      <div className="form-group mb-2">
        {" "}
        <label className="mb-1" htmlFor="color">
          Color
        </label>
        <select name="color" className="form-control" onChange={handleChange}>
          <option>Please Select</option>
          {colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group mb-2">
        {" "}
        <label className="mb-1" htmlFor="brand">
          Brand
        </label>
        <select
          name="brand"
          className="form-control"
          onChange={(e) => {
            handleChange(e);
          }}
        >
          <option>Please Select</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="category" className="mb-2">
          Category
        </label>

        <select
          name="category"
          id="category"
          className="form-control"
          onChange={(e) => {
            handleCategoryChange(e);
          }}
        >
          <option value="">Please select...</option>
          {categories.length > 0 &&
            categories.map((res) => (
              <option key={res._id} value={res._id}>
                {res.name}
              </option>
            ))}
        </select>
      </div>
      {/* {JSON.stringify(values.subs)} */}
      {show && (
        <div>
          <label htmlFor="">Sub Categories</label>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Please Select"
            value={subs}
            onChange={(value) => {
              setVales({ ...values, subs: value });
            }}
          >
            {subOptions.length &&
              subOptions.map((s) => (
                <Option keys={s._id} value={s._id}>
                  {s.name}
                </Option>
              ))}
          </Select>
        </div>
      )}
      <br />
      <button className="btn btn-outline-info float-end">SAVE</button>
    </form>
  );
};

export default ProductCreateForm;
