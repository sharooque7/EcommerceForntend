import React, { useState, useEffect, useCallback } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct, updateProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/categories";

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
const ProductUpdate = ({ match, history }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const slug = match.params.slug;

  const [subOptions, setSubOptions] = useState([]);
  const [ArrayOfSubs, setArrayOfSubs] = useState([]);
  const [show, setShow] = useState(false);
  const [values, setVales] = useState(intialState);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const loadProduct = useCallback(async () => {
    await getProduct(slug)
      .then((res) => {
        ///load single product
        setVales((prevState) => ({ ...prevState, ...res.data }));
        ///load single product subs
        getCategorySubs(res.data.category._id).then((p) => {
          setSubOptions(p.data);
        });

        //array of sub id's to show ad default sub in ant design select
        let arr = [];
        res.data.subs.map((s) => arr.push(s._id));
        setArrayOfSubs((prev) => arr); //ant design
      })

      .catch((error) => console.log(error));
  }, [slug]);

  const handleCategoryChange = async (e) => {
    e.preventDefault();
    if (e.target.value === "") setShow(false);
    else {
      setVales({ ...values, subs: [] });

      setSelectedCategory(e.target.value);
      getCategorySubs(e.target.value)
        .then((res) => {
          setSubOptions(res.data);
          setShow(true);
        })
        .catch((error) => {
          if (error.response.status === 400) {
            toast.error(error.message);
          }
        });
    }

    //if original categgory
    if (values.category._id === e.target.value) {
      loadProduct();
    }
    setArrayOfSubs([]);
  };

  const loadCatgories = useCallback(() => {
    getCategories().then((res) => {
      setVales((prevState) => ({ ...prevState, categories: res.data }));
    });
  }, []);

  useEffect(() => {
    loadProduct();
    loadCatgories();
  }, [loadProduct, loadCatgories]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    values.subs = ArrayOfSubs;
    values.category = selectedCategory ? selectedCategory : values.category;

    updateProduct(slug, values, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`${res.data.title} is updated`);
        history.push("/admin/products");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 400) {
          console.log(error);
          toast.error(error.response.data);
        }
      });
    console.log("Hi");
  };

  const handleChange = (e) => {
    setVales({ ...values, [e.target.name]: e.target.value });
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
            <h4>Product Update</h4>
          )}

          <div className="p-3">
            <FileUpload
              values={values}
              setVales={setVales}
              setLoading={setLoading}
            />
          </div>
          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            setVales={setVales}
            handleCategoryChange={handleCategoryChange}
            show={show}
            subOptions={subOptions}
            setSubOptions={setSubOptions}
            ArrayOfSubs={ArrayOfSubs}
            setArrayOfSubs={setArrayOfSubs}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
