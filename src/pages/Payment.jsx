import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../components/Stripe/StripeCheckout";

//load stripe outside of component render to avoin recreating stripe onject on every render

const promise = loadStripe(process.env.REACT_APP_SECRET);

const Payment = () => {
  return (
    <div className="container p-5 text-center">
      <Elements stripe={promise}>
        <div className="col-md-8 offset-md-2">
          <StripeCheckout />
        </div>
      </Elements>
    </div>
  );
};

export default Payment;
