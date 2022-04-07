import React, { useState, useEffect, useCallback } from "react";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../functions/product";
import { getCategories } from "../functions/categories";
import { getSubCategories } from "../functions/subCategories";
import { useSelector, useDispatch } from "react-redux";
import ProductCart from "../components/carts/ProductCart";
import { Menu, Slider, Checkbox, Radio } from "antd";
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from "@ant-design/icons";
import Star from "../components/forms/Star";
const { SubMenu } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState([0, 0]);
  const [loading, setLoading] = useState(false);
  const { search } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const { text } = search;
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const [star, setStar] = useState("");
  const [subcat, setSubcat] = useState([]);
  const [sub, setSub] = useState("");
  const brands = ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"];

  const [brand, setBrand] = useState("");
  const colors = ["Black", "Brown", "Silver", "White", "Blue"];
  const [shipping, setShipping] = useState("");

  const [color, setColor] = useState("");
  console.log(star, sub, brands, colors, color, brand);
  //1.load product by default
  const loadAllProducts = useCallback(() => {
    getProductsByCount(10).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    loadAllProducts();
    getCategories().then((res) => setCategories(res.data));
    getSubCategories().then((res) => {
      setSubcat(res.data);
    });
  }, [loadAllProducts]);

  ///2 ..load based on search input given in argument
  const fetchProducts = useCallback((arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const delayed = setTimeout(() => {
      setPrice([0, 0]);
      setCategoryId([]);
      fetchProducts({ query: text });
    }, 300);
    return () => clearTimeout(delayed);
  }, [text, fetchProducts]);

  //3--load based on price
  useEffect(() => {
    fetchProducts({ price });
  }, [ok, fetchProducts, price]);

  ///Filter by price
  const hanldeSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    //reset
    setCategoryId([]);
    setPrice(value);
    setStar("");
    setBrand("");
    setColor("");
    setShipping("");
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  //4 .load product based on category check
  //show like checkbox

  const handleCheck = (e) => {
    //alert(e.target.value);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    //resset
    setStar("");
    setBrand("");
    setPrice([0, 0]);
    setColor("");
    setShipping("");
    let inTheState = [...categoryId];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); //found  return index/ else -1

    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      //pull out one item from index
      inTheState.splice(foundInTheState, 1);
    }
    setCategoryId(inTheState);
    fetchProducts({ category: inTheState });
  };

  ///55 show category
  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className="pb-3 px-3 "
          value={c._id}
          name="category"
          checked={categoryId.includes(c._id)}
        >
          {c.name}
        </Checkbox>
      </div>
    ));

  //SubCategories
  const showSubcategories = () =>
    subcat.map((c) => (
      <div
        className="p-1 m-1 badge bg-secondary"
        style={{ cursor: "pointer" }}
        key={c._id}
        onClick={() => handleSubs(c)}
      >
        {c.name}
      </div>
    ));

  const handleSubs = (sub) => {
    setSub(sub);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    //resset
    setStar("");
    setBrand("");
    setPrice([0, 0]);
    setStar("");
    setColor("");
    setShipping("");
    fetchProducts({ sub });
  };

  ///6 Fikter by rating
  const handleStarClick = (num) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    setPrice([0, 0]);
    setCategoryId([]);
    setStar(num);
    setBrand("");
    setColor("");
    setShipping("");
    fetchProducts({ star: num });
  };
  const showStar = () => (
    <div className="px-4 pb-2 row">
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  );

  ///show Brands

  const showBrands = () =>
    brands.map((b) => (
      <Radio
        value={b}
        name={b}
        checked={b === brand}
        onChange={handleBrand}
        className="pb-1 px-1 "
      >
        {b}
      </Radio>
    ));
  const handleBrand = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    setPrice([0, 0]);
    setCategoryId([]);
    setStar("");
    setBrand("");
    setShipping("");
    setColor(e.target.value);
    fetchProducts({ color: e.target.value });
  };

  const showColors = () =>
    colors.map((c) => (
      <Radio
        value={c}
        name={c}
        checked={c === color}
        onChange={handleColor}
        className="pb-1 px-1 "
      >
        {c}
      </Radio>
    ));
  const handleColor = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    setPrice([0, 0]);
    setCategoryId([]);
    setStar("");
    setShipping("");
    setBrand(e.target.value);
    fetchProducts({ brand: e.target.value });
  };

  const showShipping = () => (
    <div>
      <Checkbox
        onChange={handleShipping}
        className="pb-3 px-4 "
        value="Yes"
        checked={shipping === "Yes"}
      >
        Yes
      </Checkbox>
      <Checkbox
        onChange={handleShipping}
        className="pb-3 px-4 "
        value="No"
        checked={shipping === "No"}
      >
        No
      </Checkbox>
    </div>
  );

  const handleShipping = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    setPrice([0, 0]);
    setCategoryId([]);
    setStar("");
    setBrand("");
    setShipping(e.target.value);

    fetchProducts({ shipping: e.target.value });
  };
  return (
    <div className="conatiner-fluid">
      <div className="row">
        <div className="col-md-3 pt-2">
          <h4 className="h4 px-4">Search/Filter</h4>
          <hr />
          <Menu
            mode="inline"
            className="mx-2"
            defaultOpenKeys={["1", "2", "3", "4", "5", "6", "7"]}
          >
            <SubMenu
              style={{ width: "90%" }}
              key="1"
              title={
                <span className="h6">
                  <DollarOutlined className="mx-1 py-1" />
                  <span>Price</span>
                </span>
              }
            >
              <div>
                <Slider
                  className="my-4 mx-4 px-2"
                  tipFormatter={(v) => `$${v}`}
                  range
                  value={price}
                  onChange={hanldeSlider}
                  max="50000"
                />
              </div>
            </SubMenu>

            {/* Category */}
            <SubMenu
              style={{ width: "90%" }}
              key="2"
              title={
                <span className="h6">
                  <DownSquareOutlined />
                  <span>Categories</span>
                </span>
              }
            >
              <div className="mx-2 my-1" style={{ marginTop: "-10px" }}>
                {showCategories()}
              </div>
            </SubMenu>

            {/* Star Rating */}
            <SubMenu
              style={{ width: "90%" }}
              key="3"
              title={
                <span className="h6">
                  <StarOutlined />
                  <span>Rating</span>
                </span>
              }
            >
              <div className=" my-1" style={{ marginTop: "-10px" }}>
                {showStar()}
              </div>
            </SubMenu>

            {/* Sub Category */}
            <SubMenu
              style={{ width: "90%" }}
              key="4"
              title={
                <span className="h6">
                  <StarOutlined />
                  <span>Sub Categories</span>
                </span>
              }
            >
              <div className=" my-1" style={{ marginTop: "-10px" }}>
                {showSubcategories()}
              </div>
            </SubMenu>

            {/* brand */}
            <SubMenu
              style={{ width: "90%" }}
              key="5"
              title={
                <span className="h6">
                  <StarOutlined />
                  <span>Brands</span>
                </span>
              }
            >
              <div className=" my-1" style={{ marginTop: "-10px" }}>
                {showBrands()}
              </div>
            </SubMenu>

            {/* colors */}
            <SubMenu
              style={{ width: "90%" }}
              key="6"
              title={
                <span className="h6">
                  <StarOutlined />
                  <span>Colors</span>
                </span>
              }
            >
              <div className=" my-1" style={{ marginTop: "-10px" }}>
                {showColors()}
              </div>
            </SubMenu>

            {/* colors */}
            <SubMenu
              style={{ width: "90%" }}
              key="7"
              title={
                <span className="h6">
                  <StarOutlined />
                  <span>Shipping</span>
                </span>
              }
            >
              <div className=" my-1" style={{ marginTop: "-10px" }}>
                {showShipping()}
              </div>
            </SubMenu>
          </Menu>
        </div>
        <div className="col-md-9 pt-2">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4 className="text-danger">Products</h4>
          )}
          {products.length < 1 && <p>No products found</p>}
          <div className="row pb-5">
            {products.map((p) => (
              <div className="col-md-4  mt-3" key={p._id}>
                <ProductCart product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
