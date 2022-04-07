import React, { useEffect, useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const Password = () => {
  const [password, setPassowrd] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    //current logged in user
    await auth.currentUser
      .updatePassword(password)
      .then((res) => {
        setLoading(false);
        setPassowrd("");
        toast.success("Password Updated");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  const passwrodUpdateForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        {" "}
        <div className="form-group">
          <label className="mb-2">Your Password</label>

          <input
            type="password"
            onChange={(e) => setPassowrd(e.target.value)}
            className="form-control"
            placeholder="Enter new password"
            disabled={loading}
            value={password}
          />
          <br />
          {password.length > 0 && password.length < 6 ? (
            <p className="text-danger">
              Password should be atleast 6 chearacter long
            </p>
          ) : null}
          <button
            className="btn btn-primary"
            disabled={!password || password.length < 6 || loading}
          >
            Submit
          </button>
        </div>
      </form>
    );
  };

  useEffect(() => {}, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2 col-xl-2 col-md-2">
          {" "}
          <UserNav />
        </div>
        <div className="col-lg-9 col-xl-9 col-md-9">
          {loading ? (
            <h4 className="text-danger">Laoding...</h4>
          ) : (
            <h4>Password Update</h4>
          )}
          {passwrodUpdateForm()}
        </div>
      </div>
    </div>
  );
};

export default Password;
