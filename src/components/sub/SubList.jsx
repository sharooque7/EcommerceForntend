import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSubCategories } from "../../functions/subCategories";

const SubList = () => {
  const [subs, setSubs] = useState([]);
  const [loaidng, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getSubCategories().then((res) => {
      setSubs(res.data);
      setLoading(false);
    });
  }, []);

  const showSubs = () =>
    subs.map((c) => (
      <div className=" col-md-3 " key={c._id}>
        {" "}
        <Link
          className=" col-md-3 btn btn-outline-secondary btn-lg btn-block m-3"
          style={{ textDecoration: "none", color: "green", width: "100%" }}
          to={`/subs/${c.slug}`}
        >
          {c.name}
        </Link>
      </div>
    ));
  return (
    <>
      {" "}
      <h4 className="text-center p-3 mt-5 mb-5 display-4" style={style}>
        Sub Categories
      </h4>
      <div className="container">
        <div className="row">
          {loaidng ? <h4 className="text-center">Loading...</h4> : showSubs()}
        </div>
      </div>
    </>
  );
};

const style = {
  padding: "2rem 1rem",
  marginBottom: "2rem",
  backgroundColor: "#e9ecef",
  borderRadius: ".3rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "15vh",
};

export default SubList;
