import React, { useState, useEffect } from "react";
import style from "./register.module.css";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Register = ({ history }) => {
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user, history]);

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);

    toast.success(
      `Email is sent to ${email} . Clcik the link to complete the registration`
    );

    //save email in local storage
    localStorage.setItem("emailForRgistration", email);
    setEmail("");
  };
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className={`form-control ${style.text}`}
        value={email}
        onChange={(e) => {
          handleChange(e);
        }}
        placeholder="Your email"
        autoFocus
      ></input>
      <button type="submit" className="btn btn-raised">
        Register
      </button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>

          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
