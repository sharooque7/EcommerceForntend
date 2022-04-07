import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { searchReducer } from "./searchReducer";
import { cartReducer } from "./cartReducer";
import { drawReducer } from "./drawReducer";
import { couponReducer } from "./couponReducer";
import { CODReducer } from "./cod";

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  cart: cartReducer,
  drawer: drawReducer,
  coupon: couponReducer,
  COD: CODReducer,
});

export default rootReducer;
