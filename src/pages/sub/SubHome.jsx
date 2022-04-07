import React, { useEffect, useState } from "react";
import { getSubCategory } from "../../functions/subCategories";
import ProductCart from "../../components/carts/ProductCart";

const SubHome = ({ match }) => {
  const [subs, setSubs] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getSubCategory(slug).then((res) => {
      setSubs(res.data.subs);
      setProducts(res.data.products);

      setLoading(false);
    });
  }, [slug]);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          {loading ? (
            <h4 className="text-center p-3 mt-5 mb-5 display-4" style={style}>
              Loading...
            </h4>
          ) : (
            <h4 className="text-center p-3 mt-5 mb-5 display-4" style={style}>
              {products.length} Products in "{subs.name}" sub category
            </h4>
          )}
        </div>
      </div>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4" key={product._id}>
            <ProductCart product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default SubHome;

const style = {
  padding: "2rem 1rem",
  marginBottom: "2rem",
  backgroundColor: "#e9ecef",
  borderRadius: ".3rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "10vh",
};
