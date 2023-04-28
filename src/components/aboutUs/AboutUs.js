import React from "react";
//Styles
import Styles from "./AboutUs.module.css";
//Images
import src from "../../img/Workplace.jpg";
const AboutUs = () => {
  return (
    <main className={Styles.container}>
      <article>
        <h3>AboutUs?</h3>
        <p>
          Ehsan Kayhani store company started its activity in 2022-5-26 and
          thank God it has been a good business so far. All employees and
          workers are trying to deliver quality products to the customer Ehsan
          Kayhani store company started its activity in 2022-5-26 and thank God
          it has been a good business so far. All employees and workers are
          trying to deliver quality products to the customer
        </p>
      </article>
      <img src={src} />
    </main>
  );
};

export default AboutUs;
