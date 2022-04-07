import React, { useState } from "react";
import { Menu, Badge } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import firebase from "firebase/compat/app";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Search from "../forms/Search";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => ({ ...state }));
  const history = useHistory();
  const handleClick = (e) => {
    // console.log(e.key);
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      className="d-flex justify-content-between"
    >
      <div className="d-flex flex-direction-row " style={{ width: "100%" }}>
        <Item key="home" icon={<AppstoreOutlined />}>
          <Link to="/">Home</Link>
        </Item>
        <Item key="Shop" icon={<ShoppingOutlined />}>
          <Link to="/Shop">Shop</Link>
        </Item>

        <Item key="cart" icon={<ShoppingCartOutlined />}>
          <Link to="/cart">
            <Badge count={cart.length} offset={[9, 0]}>
              Cart
            </Badge>
          </Link>
        </Item>

        {/* <Item key="login" icon={<UserOutlined />}>
          <Link to="/login">Login</Link>
        </Item> */}

        {user && (
          <SubMenu
            icon={<SettingOutlined />}
            title={user.email && user.email.split("@")[0]}
          >
            {user && user.role === "subscriber" && (
              <Item key="user">
                <Link to="/user/history">DashBoard</Link>
              </Item>
            )}

            {user && user.role === "admin" && (
              <Item key="admin">
                <Link to="/admin/dashboard">DashBoard</Link>
              </Item>
            )}
            <Item icon={<LogoutOutlined />} key="Logout" onClick={logout}>
              LOGOUT
            </Item>
          </SubMenu>
        )}
      </div>

      {!user && (
        <div
          className="d-flex flex-direction-row justify-content-end"
          style={{ width: "100%" }}
        >
          {!user && (
            <Item key="login" icon={<UserOutlined />}>
              <Link to="/login">Login</Link>
            </Item>
          )}

          {!user && (
            <Item key="register" icon={<UserAddOutlined />}>
              <Link to="/register">Register</Link>
            </Item>
          )}

          {/* <Item key="login" icon={<UserOutlined />}>
          <Link to="/login">Login</Link>
        </Item> */}
          <span className="float-end p-1">
            <Search />
          </span>
        </div>
      )}
    </Menu>
  );
};

export default Header;
