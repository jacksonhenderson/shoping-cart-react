import React, { useEffect } from "react";

//Components
import DescriptionNavbar from "./DescriptionNavbar.js";
import ProductsOffers from "./offers/ProductsOffers.js";
import PostedBanner from "./PostedBanner";
import Contract from "./Contract";
//Styles
import Styles from "./Home.module.css";

const Home = () => {
  return (
    <main className={Styles.container}>
      <DescriptionNavbar />
      <ProductsOffers />
      <PostedBanner />
      <Contract />
    </main>
  );
};

export default Home;
