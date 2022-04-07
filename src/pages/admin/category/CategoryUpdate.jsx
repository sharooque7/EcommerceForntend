import React, { useState, useCallback, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategory, updateCategory } from "../../../functions/categories";
import CategoryForm from "../../../components/forms/CategoryForm";

const CategoryUpdate = ({ history, match }) => {
  const user = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [loading, setLoding] = useState(false);

  const loadCatgory = useCallback(() => {
    getCategory(user.token, match.params.slug).then((res) =>
      setName(res.data.name)
    );
  }, [match.params.slug, user.token]);

  useEffect(() => {
    loadCatgory();
  }, [loadCatgory]);

  const handleSubmt = async (e) => {
    e.preventDefault();
    setLoding(true);
    await updateCategory(user.token, match.params.slug, name)
      .then((res) => {
        setLoding(false);
        setName("");
        toast.success(`${res.data.name} category has been created`);
        history.push("/admin/category");
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
            <h4>Update category</h4>
          ) : (
            <h4 className="text-danger">Loading...</h4>
          )}
          <CategoryForm
            handleSubmt={handleSubmt}
            setName={setName}
            name={name}
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
