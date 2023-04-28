import React from "react";
//Dispatch
import { useDispatch } from "react-redux";
import { decrease, increase, removeItem } from "../../redux/cart/cartReduser";
// Functions
import { shorten } from "../../functions/functions";
// Icons
import { BsFillTrashFill } from "react-icons/bs";
// Style
import styles from "./Cart.module.css";

const Cart = (props) => {
  console.log(props);
  const dispatch = useDispatch();
  const { image, title, price, quantity } = props.data;

  return (
    <div className={styles.container}>
      <img className={styles.productImage} src={image} />
      <div className={styles.data}>
        <h3>{shorten(title)}</h3>
        <p>{price} $</p>
      </div>

      <div>
        <span className={styles.quantity}>{quantity}</span>
      </div>

      <div className={styles.buttonContainer}>
        {quantity > 1 ? (
          <button onClick={() => dispatch(decrease(props.data))}>-</button>
        ) : (
          <button onClick={() => dispatch(removeItem(props.data))}>
            <BsFillTrashFill />
          </button>
        )}
        <button onClick={() => dispatch(increase(props.data))}>+</button>
      </div>
    </div>
  );
};

export default Cart;
