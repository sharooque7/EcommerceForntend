import React, { useState, useEffect } from "react";
import style from "./register.module.css";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createOrUpdateUser } from "../../functions/auth";

const RegisterComplete = ({ history }) => {
  // const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(() => {
    setEmail(localStorage.getItem("emailForRgistration"));
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //props.history
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and password is required");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be atleast 6 character long");
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        //remove user emil from local stoarage
        localStorage.removeItem("emailForRgistration");
        //auth will track the current user online so removing local storage
        let user = auth.currentUser;
        await user.updatePassword(password);
        // get user id token
        const idTokenResult = await user.getIdTokenResult();
        //redux store

        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            console.log("Craete and Update", res);
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((error) => {
            toast.error(error.message);
          });
        //redirect
        history.push("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //set password
  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  //Form Complete Registration
  const completeRegisterForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className={`form-control ${style.text}`}
        value={email}
        disabled
      ></input>
      <input
        type="password"
        className={`form-control ${style.text}`}
        value={password}
        onChange={(e) => handleChange(e)}
        autoFocus
        placeholder="Password"
      />
      <button type="submit" className="btn btn-raised">
        Complete Registration
      </button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>

          {completeRegisterForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
