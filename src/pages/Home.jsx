import React from "react";
import Jumbotron from "../components/carts/Jumbotron";
import NewArrivals from "../components/Home/NewArrivals";
import BestSellers from "../components/Home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";

const Home = () => {
  return (
    <>
      <div className="pt-3 text-danger h1 font-weight-bold " style={style}>
        <Jumbotron text={["Latest Products", "New Arrivals", "Best Sellers"]} />
      </div>
      <NewArrivals />
      <BestSellers />

      <CategoryList />

      <SubList />
      <br />
      <br />
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
  height: "25vh",
};
export default Home;
