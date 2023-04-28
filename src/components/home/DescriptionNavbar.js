import React from "react";
//Styles
import Styles from "./DescriptionNavbar.module.css";

const DescriptionNavbar = () => {
  return (
    <section className={Styles.container}>
      <div>
        <article>
          <h2>Check the store</h2>
          <p>
            We use Fake Store API to get information from the database and
            display this information includes a variety of home appliances with
            categories of electronics, jewelry, menswear and menswear We use
            Fake Store API to get information from the database and display this
            information includes a variety of home appliances with categories of
            electronics, jewelry, menswear and menswear
          </p>
        </article>
      </div>
    </section>
  );
};

export default DescriptionNavbar;
