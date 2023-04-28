import React from "react";

//Styles
import Styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={Styles.container}>
      <div className={Styles.loading}></div>
    </div>
  );
};

export default Loading;
