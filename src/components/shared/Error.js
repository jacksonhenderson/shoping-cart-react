import React from "react";

//Styles
import Styles from "./Error.module.css";

const Error = (peops) => {
  return (
    <div className={Styles.container}>
      <div>
        <h2>{peops.error}</h2>
      </div>
    </div>
  );
};
export default Error;
