import React, { useState, useEffect, useCallback } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  getSubCategory,
  updateSubCategory,
} from "../../../functions/subCategories";
import { getCategories } from "../../../functions/categories";
import CategoryForm from "../../../components/forms/CategoryForm";

const SubUpdate = ({ match, history }) => {
  const user = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [loading, setLoding] = useState(false);
  //list of category Parent
  const [categories, setCategories] = useState([]);

  //sub categores
  const [parent, setParent] = useState("");

  const loadCatgories = () =>
    getCategories().then((res) => setCategories(res.data));

  const loadSubCategory = useCallback(() => {
    getSubCategory(user.token, match.params.slug).then((res) => {
      setName(res.data.name);
      setParent(res.data.parent);
    });
  }, [match.params.slug, user.token]);

  useEffect(() => {
    loadCatgories();
    loadSubCategory();
  }, [loadSubCategory]);

  const handleSubmt = async (e) => {
    e.preventDefault();
    setLoding(true);
    await updateSubCategory(user.token, match.params.slug, name, parent)
      .then((res) => {
        setLoding(false);
        setName("");
        toast.success(`${res.data.name} category has been updated`);
        history.push("/admin/subcategory");
      })
      .catch((error) => {
        setLoding(false);
        if (error.response.status === 400) toast.error(error.response.data);
      });
  };

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
            <h4>Update Sub category</h4>
          ) : (
            <h4 className="text-danger">Loading...</h4>
          )}
          <div className="form-group">
            <label htmlFor="category" className="mb-2">
              Parent category
            </label>

            <select
              name="category"
              id="category"
              className="form-control"
              onChange={(e) => {
                setParent(e.target.value);
              }}
            >
              <option>Please select...</option>
              {categories.length > 0 &&
                categories.map((res) => (
                  <option
                    key={res._id}
                    value={res._id}
                    selected={res._id === parent}
                  >
                    {res.name}
                  </option>
                ))}
            </select>
          </div>
          <CategoryForm
            handleSubmt={handleSubmt}
            setName={setName}
            name={name}
          />
          <br />
        </div>
      </div>
    </div>
  );
};

export default SubUpdate;
