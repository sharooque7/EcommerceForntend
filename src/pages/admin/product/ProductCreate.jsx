import React, { useState, useEffect, useCallback } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/categories";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";

const intialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: 0,
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "",
  brand: "",
};

const ProductCreate = () => {
  const [values, setVales] = useState(intialState);
  const user = useSelector((state) => state.user);
  const [subOptions, setSubOptions] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadCatgories = useCallback(() => {
    getCategories().then((res) =>
      setVales((prevState) => ({ ...prevState, categories: res.data }))
    );
  }, []);
  useEffect(() => {
    loadCatgories();
  }, [loadCatgories]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createProduct(user.token, values)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          toast.success("Created successfully");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) {
          toast.error(error.response.data.error);
        }
      });
  };

  const handleChange = (e) => {
    setVales({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = async (e) => {
    e.preventDefault();
    if (e.target.value === "") setShow(false);
    else {
      console.log("ID", e.target.value);
      setVales({ ...values, subs: [], category: e.target.value });
      getCategorySubs(e.target.value)
        .then((res) => {
          setSubOptions(res.data);
          console.log("SUbOptinns", res.data);
          setShow(true);
        })
        .catch((error) => {
          if (error.response.status === 400) {
            toast.error(error.message);
          }
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
        <div className="col-md-9">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Product Create</h4>
          )}

          {/* -------------FORM--------------- */}
          <div className="p-3">
            <FileUpload
              values={values}
              setVales={setVales}
              setLoading={setLoading}
            />
          </div>
          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            handleCategoryChange={handleCategoryChange}
            show={show}
            subOptions={subOptions}
            setSubOptions={setSubOptions}
            setVales={setVales}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
