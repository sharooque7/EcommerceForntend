import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/categories";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const CategoryCreate = () => {
  const user = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [loading, setLoding] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCatgories();
  }, []);

  const loadCatgories = () =>
    getCategories().then((res) => setCategories(res.data));

  const handleSubmt = async (e) => {
    e.preventDefault();
    setLoding(true);
    await createCategory(user.token, name)
      .then((res) => {
        setLoding(false);
        setName("");
        toast.success(`${res.data.name} category has been created`);
        loadCatgories();
      })
      .catch((error) => {
        setLoding(false);
        if (error.response.status === 400) toast.error(error.response.data);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Are you sure you want to delete")) {
      setLoding(true);
      await removeCategory(user.token, slug)
        .then((res) => {
          setLoding(false);
          toast.success(`${res.data.name} deleted successfully`);
          loadCatgories();
        })
        .catch((error) => {
          if (error.response.status === 400) {
            setLoding(false);
            toast.error(error.response.data);
          }
        });
    }
  };
  ///Searching and filterng

  //step1
  const [keyword, setKeyword] = useState("");

  //step 4
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 col-ls-2">
          {" "}
          <AdminNav />
        </div>

        <div className="col-md-9 col-ls-9">
          {" "}
          {!loading ? (
            <h4>Create category</h4>
          ) : (
            <h4 className="text-danger">Loading...</h4>
          )}
          <CategoryForm
            handleSubmt={handleSubmt}
            setName={setName}
            name={name}
          />
          <br />
          {/* step 2 and step 3 */}
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
          {/* Step 5 */}
          {categories.filter(searched(keyword)).map((res) => (
            <div className="alert alert-secondary" key={res._id}>
              {res.name}{" "}
              <span
                onClick={() => {
                  handleRemove(res.slug);
                }}
                className="btn btn-sm float-end"
              >
                <DeleteOutlined className="text-danger" />
              </span>{" "}
              <Link to={`/admin/category/${res.slug}`}>
                <span className="btn btn-sm float-end">
                  <EditOutlined className="text-warning" />
                </span>{" "}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
