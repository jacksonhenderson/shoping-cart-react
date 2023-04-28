import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// dispatch
import { clear } from "../../../redux/cart/cartReduser";
import {
  successfulOrder,
  unsuccessfulOrder,
} from "../../../redux/orders/ordersActions";

//Styles
import Styles from "./PaymentStatus.module.css";

const PaymentStatus = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cartState);

  useEffect(() => {
    if (!cart.itemsCounter) navigate("/store");
    if (cart.itemsCounter) {
      if (paymentStatus) {
        dispatch(successfulOrder(cart));
        dispatch(clear());
      } else {
        dispatch(unsuccessfulOrder(cart));
        dispatch(clear());
      }
    }
  }, []);
  // Finding a random number and converting it to boolean
  const randomBool = () => {
    let bool;
    if (Math.random() >= 0.6) bool = false;
    else bool = true;
    return bool;
  };
  // payment result
  const [paymentStatus] = useState(randomBool());

  return (
    <main className={Styles.container}>
      {paymentStatus ? (
        <section className={Styles.successful}>
          <h3>Your payment was successful</h3>
          <span>You can see the status of your order on the orders page</span>
          <Link to="/orders">Orders</Link>
        </section>
      ) : (
        <section className={Styles.Failed}>
          <h3>Your payment failed</h3>
          <span>Try by clicking the button below</span>
          <Link to="/orders">Orders</Link>
        </section>
      )}
    </main>
  );
};

export default PaymentStatus;
