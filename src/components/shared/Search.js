import React from "react";
import { useNavigate } from "react-router-dom";

//function
import { shorten } from "../../functions/functions";

//Styles
import Styles from "./Search.module.css";

const Search = ({ data }) => {
  const navigate = useNavigate();
  const { image, title, price, id } = data;

  return (
    <>
      <div
        className={Styles.container}
        onClick={(e) => e.stopPropagation(navigate(`/store/${id}`))}
      >
        <img src={image} />
        <h3>{shorten(title)}</h3>
        <span>{price}</span>
      </div>
    </>
  );
};

export default Search;
