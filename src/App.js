import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

//Redux
import store from "./redux/store";

//Components
import Nav from "./components/navbar/Nav";
import Profile from "./components/profile/Profile";
import EditProfile from "./components/profile/EditProfile";
import Home from "./components/home/Home";
import Store from "./components/store/Store";
import Saved from "./components/saved/Saved";
import Details from "./components/shared/Details";
import ShopCart from "./components/shopCart/ShopCart";
import PaymentStatus from "./components/shopCart/status/PaymentStatus";
import Footer from "./components/footer/Footer";
import Orders from "./components/orders/Orders";
import AboutUs from "./components/aboutUs/AboutUs";
import Contactus from "./components/contactUs/Contactus";
import Login from "./components/signup_login/Login";
import SignUp from "./components/signup_login/Signup";
import TopScroll from "./components/helper/TopScroll";
import ChekedLocalStorage from "./components/helper/ChekedLocalStorage";
//Styles
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <Nav />
      <ChekedLocalStorage />
      <TopScroll />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/editProfile" element={<EditProfile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/store/:ID" element={<Details />} />
        <Route path="/cart" element={<ShopCart />} />
        <Route path="/paymentStatus" element={<PaymentStatus />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/contactUs" element={<Contactus />} />
        <Route path="*" element={<div className="notFound"><h2>Page not found</h2></div>}/>
      </Routes>
      <Footer />
    </Provider>
  );
};

export default App;
