import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardInCheckout from "../components/carts/ProductCardInCheckout";
import { userCart } from "../functions/user";

const Cart = ({ history }) => {
  const { user, cart } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();
  const getTotal = () => {
    return cart.reduce((current, next) => {
      return current + next.count * next.price;
    }, 0);
  };

  const saveOrderDb = async () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    userCart(cart, user.token)
      .then((res) => {
        if (res.data.ok) {
          history.push("/checkout");
        }
      })
      .catch((error) => console.log(error));
  };

  const saveCashOrderDb = () => {
    dispatch({ type: "COD", payload: true });
    userCart(cart, user.token)
      .then((res) => {
        if (res.data.ok) {
          history.push("/checkout");
        }
      })
      .catch((error) => console.log(error));
  };

  const showCartItems = () => {
    return (
      <table className="table table-bordered mx-2">
        <thead className="thead-light ">
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </thead>
        {cart.map((product) => (
          <ProductCardInCheckout key={product._id} product={product} />
        ))}
      </table>
    );
  };
  return (
    <div className="containr-fluid py-2">
      <div className="row">
        <div className="row">
          <div className="col-md-8">
            <h4 className="mx-3">Cart / {cart.length} Product</h4>
            {!cart.length ? (
              <p>
                No products in cart.<Link to="/shop">Continue shopping</Link>
              </p>
            ) : (
              showCartItems()
            )}
          </div>
          <div className="col-md-4">
            Order Summary
            <hr />
            <p>Products</p>
            {cart.map((c, i) => (
              <div key={i}>
                <p>
                  {c.title} x {c.count} = $ {c.price * c.count}
                </p>
              </div>
            ))}
            <hr />
            Total : <b>$ {getTotal()}</b>
            <hr />
            {user ? (
              <>
                <button
                  onClick={saveOrderDb}
                  className="btn btn-sm btn-primary mt-2"
                  disabled={!cart.length}
                >
                  Proceed to Checkout
                </button>
                <br />
                <button
                  onClick={saveCashOrderDb}
                  className="btn btn-sm btn-primary mt-2  my-2"
                  disabled={!cart.length}
                >
                  Pay Cash on Delivery
                </button>
              </>
            ) : (
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to={{ pathname: "/login", state: { from: "/cart" } }}
              >
                <button className="btn btn-sm btn-dark mt-2">
                  {" "}
                  Login to Checkout
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
