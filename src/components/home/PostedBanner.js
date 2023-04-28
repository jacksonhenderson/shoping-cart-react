import React from "react";

//Images
import image from "../../img/post.jpg";

//Styles
import Styles from "./PostedBanner.module.css";

const PostedBanner = () => {
  return (
    <article className={Styles.Container}>
      <section className={Styles.title}>
        <h2>How to post?</h2>
        <p>
          We put your products and orders in strong and shockproof packages and
          we will mail them to you by post of the Islamic Republic of Iran.We
          put your products and orders in strong and shockproof packages and we
          will mail them to you by post of the Islamic Republic of Iran.We put
          your products and orders in strong and shockproof packages and we will
          mail them to you by post of the Islamic Republic of Iran.We put your
          products and orders in strong and shockproof packages and we will mail
          them to you by post of the Islamic Republic of Iran
        </p>
      </section>
      <section className={Styles.image}>
        <img src={image} alt="post" />
      </section>
    </article>
  );
};

export default PostedBanner;
