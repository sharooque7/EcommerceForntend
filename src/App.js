import React, { useEffect, lazy, Suspense } from "react";
import { ToastContainer, toast } from "react-toastify";
import { auth } from "./firebase";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { currentUser } from "../src/functions/auth";
import { LoadingOutlined } from "@ant-design/icons";
const Login = lazy(() => import("./pages/auth/Login"));
const Home = lazy(() => import("./pages/Home"));
const Header = lazy(() => import("./components/nav/Header"));
const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const History = lazy(() => import("./pages/user/History"));
const UserRoute = lazy(() => import("./components/routes/UserRoute"));
const Password = lazy(() => import("./pages/user/Password"));
const Whislist = lazy(() => import("./pages/user/Wishlist"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminRoute = lazy(() => import("./components/routes/UserRoute"));
const CategoryCreate = lazy(() =>
  import("./pages/admin/category/CategoryCreate")
);
const CategoryUpdate = lazy(() =>
  import("./pages/admin/category/CategoryUpdate")
);
const SubCreate = lazy(() => import("./pages/admin/subCategory/SubCreate"));
const SubUpdate = lazy(() => import("./pages/admin/subCategory/SubUpdate"));
const ProductCreate = lazy(() => import("./pages/admin/product/ProductCreate"));
const AllProducts = lazy(() => import("./pages/admin/product/AllProducts"));
const ProductUpdate = lazy(() => import("./pages/admin/product/ProductUpdate"));
const Product = lazy(() => import("../src/pages/admin/product/Product"));
const CategoryHome = lazy(() => import("./pages/category/CategoryHome"));
const SubHome = lazy(() => import("./pages/sub/SubHome"));
const Shop = lazy(() => import("../src/pages/Shop"));
const Cart = lazy(() => import("../src/pages/Cart"));
const SlideDrawer = lazy(() => import("./components/drawer/SlideDrawer"));
const Checkout = lazy(() => import("./pages/Checkout"));
const CreateCoupon = lazy(() => import("./pages/admin/coupon/CreateCoupon"));
const Payment = lazy(() => import("../src/pages/Payment"));

const Register = lazy(() => import("./pages/auth/Register"));

const App = () => {
  const dispatch = useDispatch();
  // to take firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        currentUser(idTokenResult.token)
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
      }
    });
    //clean up
    return () => unsubscribe();
  }, [dispatch]); //---///
  return (
    <Suspense
      fallback={
        <div className="col text-center p-5">
          __EC
          <LoadingOutlined />
          MMERCE
        </div>
      }
    >
      {" "}
      <Header />
      <SlideDrawer />
      <ToastContainer />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/register/complete/" component={RegisterComplete} exact />
        <Route path="/forgot/password/" component={ForgotPassword} exact />
        {/* Protection of routes */}
        <UserRoute path="/user/history/" component={History} exact />
        <UserRoute path="/user/password/" component={Password} exact />
        <UserRoute path="/user/wishlist/" component={Whislist} exact />
        <AdminRoute path="/admin/dashboard" component={AdminDashboard} exact />
        <AdminRoute path="/admin/category" component={CategoryCreate} exact />
        <AdminRoute
          path="/admin/category/:slug"
          component={CategoryUpdate}
          exact
        />
        <AdminRoute path="/admin/subcategory/" component={SubCreate} exact />
        <AdminRoute
          path="/admin/subcategory/:slug"
          component={SubUpdate}
          exact
        />
        <AdminRoute path="/admin/product/" component={ProductCreate} exact />
        <AdminRoute path="/admin/products/" component={AllProducts} exact />
        <AdminRoute
          path="/admin/product/:slug"
          component={ProductUpdate}
          exact
        />
        <Route exact path="/product/:slug" component={Product} />
        <Route exact path="/category/:slug" component={CategoryHome} />
        <Route exact path="/subs/:slug" component={SubHome} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />
        <UserRoute exact path="/checkout" component={Checkout} />
        <AdminRoute path="/admin/coupon" component={CreateCoupon} exact />
        <UserRoute exact path="/payment" component={Payment} />
      </Switch>
    </Suspense>
  );
};

export default App;
