import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// functions
import { quantityCount, shorten, isInCart } from "../../functions/functions";

// dispatch
import {
  addItem,
  increase,
  removeItem,
  decrease,
} from "../../redux/cart/cartReduser";
import {
  addProduct,
  delProduct,
  getSaves,
} from "../../redux/saveProduct/saveProductAction";

//Icons
import { BsFillTrashFill } from "react-icons/bs";
import { BsFillBookmarkStarFill } from "react-icons/bs";

//Styles
import Styles from "./Product.module.css";

const Product = ({ productData }) => {
  // console.log(productData);
  const state = useSelector((state) => state.cartState);
  const savas = useSelector((state) => state.savedState);
  const dispatch = useDispatch();
  const [saved, setSaved] = useState(false);
  //Go to saved
  useEffect(() => {
    dispatch(getSaves());
  }, []);

  useEffect(() => {
    // Find saved
    const statusSave = !!savas.find((item) => item.id === productData.id);
    if (statusSave) {
      setSaved(true);
    }
  }, [savas]);
  //Save Product
  const saveProduct = () => {
    setSaved(!saved);
    if (saved) {
      dispatch(delProduct(productData));
    } else {
      dispatch(addProduct(productData));
    }
  };
// console.log(state);
// console.log(quantityCount(state, productData.id));
// console.log(productData);
  return (
    <div className={Styles.container}>
      <img src={productData.image} />
      <BsFillBookmarkStarFill
        className={saved ? Styles.save : Styles.deleteSave}
        onClick={() => saveProduct()}
      />
      <h3>{productData.title}</h3>
      <p>{productData.price} $</p>
      <div className={Styles.linkContainer}>
        <Link to={`/store/${productData.id}`}>Details</Link>
        <div className={Styles.buttonContainer}>
          {quantityCount(state, productData.id) === 1 && (
            <button
              className={Styles.smallButton}
              onClick={() => dispatch(removeItem(productData))}
            >
              <BsFillTrashFill />
            </button>
          )}
          {quantityCount(state, productData.id) > 1 && (
            <button
              className={Styles.smallButton}
              onClick={() => dispatch(decrease(productData))}
            >
              -
            </button>
          )}
          {quantityCount(state, productData.id) > 0 && (
            <span className={Styles.counter}>
              {quantityCount(state, productData.id)}
            </span>
          )}

          {isInCart(state, productData.id) ? (
            <button
              className={Styles.smallButton}
              onClick={() => dispatch(increase(productData))}
            >
              +
            </button>
          ) : (
            <button onClick={() => dispatch(addItem(productData))}>
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
