import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  createCashOrder,
  applyCoupon,
} from "../functions/user";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Checkout = ({ history }) => {
  const dispatch = useDispatch();
  const {
    cart,
    user,
    COD,
    coupon: appliedCoupun,
  } = useSelector((state) => ({ ...state }));
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, [user.token]);

  const saveAddressToDb = () => {
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address saved");
      }
    });
  };

  const showAddress = () => {
    return (
      <>
        {" "}
        <ReactQuill theme="snow" value={address} onChange={setAddress} />
        <button
          className="btn btn-small btn-primary m-2"
          onClick={saveAddressToDb}
        >
          Save Address to procces to payment
        </button>
      </>
    );
  };
  const showProductSummary = () => {
    return products.map((p, i) => (
      <div key={i}>
        {/* {JSON.stringify(p)} */}
        <p>
          {p.product.title} ({p.color}) x {p.count} ={""}
          {p.price * p.count}
        </p>
      </div>
    ));
  };

  const applyDiscountCoupon = () => {
    applyCoupon(user.token, coupon).then((res) => {
      if (res.data) {
        setTotalDiscount(res.data);
        setDiscountError("");
        setCoupon("");
        //psuh to redux
        dispatch({ type: "COUPON_APPLIED", payload: true });
      }
      //errro
      if (res.data.err) {
        setDiscountError(res.data.err);
        setTotalDiscount("");
        setCoupon("");
        //update redux
        dispatch({ type: "COUPON_APPLIED", payload: false });
      }
    });
  };

  const showApplyCoupons = () => (
    <>
      <input
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscountError("");
        }}
        type="text"
        className="form-control general shadow-none"
      />
      <button
        onClick={applyDiscountCoupon}
        className="btn mx-2 btn-primary mt-2"
      >
        Apply coupon
      </button>
    </>
  );

  const emptyCart = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    dispatch({ type: "ADD_TO_CART", payload: [] });

    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalDiscount(0);
      setCoupon("");
      toast.success("cart is empty continue shopping");
    });
    history.push("/shop");
  };

  const creatCashOrder = () => {
    createCashOrder(user.token, COD, appliedCoupun).then((res) => {
      if (res.data.ok) {
        localStorage.removeItem("cart");
        dispatch({ type: "ADD_TI_CART", payload: [] });

        dispatch({ type: "COUPON_APPLIED", payload: false });

        dispatch({ type: "COD", payload: false });

        emptyCart(user.token);

        //
        setTimeout(() => {
          if (user.role === "admin") history.push("/admin/dashboard");
          else history.push("/user/history");
        }, 1000);
      }
    });
  };
  return (
    <div className="row mx-2">
      <div className="col-md-6">
        <h4>Deleivery Address</h4>
        <br />
        {showAddress()}
        <hr />
        <h4>Got Coupoun</h4>
        {showApplyCoupons()}
        <br />
        {discountError && (
          <p className="bg-danger p-2 my-2 text-center">{discountError}</p>
        )}
      </div>
      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <p>Products {cart.length}</p>
        <hr />
        {showProductSummary()}
        <p>Cart Total: $ {total}</p>

        {totalDiscount > 0 && (
          <p className="bg-success p-2 my-2 text-center">
            Disount Applied: Total Payable: $ {totalDiscount}
          </p>
        )}

        <div className="row">
          <div className="col-md-6">
            {COD ? (
              <button
                disabled={!addressSaved || !products.length}
                className="btn btn-primary"
                onClick={creatCashOrder}
              >
                Place Order
              </button>
            ) : (
              <button
                disabled={!addressSaved || !products.length}
                className="btn btn-primary"
                onClick={() => {
                  history.push("/payment");
                }}
              >
                Place Order
              </button>
            )}{" "}
          </div>
          <div className="col-md-6">
            {" "}
            <button
              onClick={emptyCart}
              disabled={!products.length}
              className="btn btn-primary"
            >
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
