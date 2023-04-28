import React from "react";
import { Link } from "react-router-dom";
//Icons
import { AiOutlineInstagram } from "react-icons/ai";
import { RiTelegramLine } from "react-icons/ri";
import { FiTwitter } from "react-icons/fi";
import { FaFacebook } from "react-icons/fa";
//Styles
import Styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={Styles.container}>
      <section className={Styles.information}>
        <section className={Styles.pages}>
          <h2>Pages</h2>
          <div>
            <Link to="/profile">Profile</Link>
            <Link to="/home">Home</Link>
            <Link to="/store">Store</Link>
            <Link to="/saved">Saved</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/orders">Orders</Link>
            <Link to="/aboutUs">About Us </Link>
            <Link to="/contactUs">Contact Us</Link>
          </div>
        </section>

        <section className={Styles.companies}>
          <h2>Companies</h2>
          <div>
            <Link to="#">Adidas</Link>
            <Link to="#">Nike</Link>
            <Link to="#">Intel</Link>
            <Link to="#">Samsung</Link>
            <Link to="#">LG</Link>
          </div>
          <ul></ul>
        </section>

        <section>
          <h2>Follow</h2>
          <section className={Styles.follow}>
            <div>
              <FiTwitter />
              <Link to="#">Twitter</Link>
            </div>

            <div>
              <FaFacebook />
              <Link to="#">Facebook </Link>
            </div>

            <div>
              <AiOutlineInstagram />
              <Link to="#">Instagram </Link>
            </div>

            <div>
              <RiTelegramLine />
              <Link to="#"> Telegram</Link>
            </div>
          </section>
        </section>
      </section>
      {/* Copy Right */}
      <section className={Styles.copyRight}>
        <h5>
          All information on this site belongs only to the company{" "}
          <span>Shotor Dar khoab Binad Panbe Daneh</span>
        </h5>
        <p>
          The content submitted by the site is published under the license of CC
          BY-SA 3.0.
        </p>
      </section>
    </footer>
  );
};

export default Footer;
