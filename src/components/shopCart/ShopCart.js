import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

//Components
import Cart from "../shared/Cart";
//Message
import { msgComplete } from "./status/Message";
// function
import { getCookie } from "../../functions/getCookie";
//Dispatch
import { clear } from "../../redux/cart/cartReduser";
import { getOrders } from "../../redux/orders/ordersActions";
//Styles
import Styles from "./ShopCart.module.css";

import { Button } from "@mui/material";

const ShopCart = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const state = useSelector((state) => state.cartState);
  const { selectedItems, itemsCounter, total } = state;
  // console.log(selectedItems);
  // console.log(itemsCounter);
  // console.log(total);

  const [message, setMessage] = useState();

  useEffect(() => {
    setMessage(msgComplete());
    dispatch(getOrders());
  }, []);

  const getPayments = () => {
    if (getCookie("token")) {
      navigate("/paymentStatus");
    }
  };

  return (
    <main className={Styles.container}>
      {/* Check the number of products */}
      {itemsCounter > 0 && (
        <section className={Styles.payments}>
          <div className={Styles.message}>
            <p>
              <span>Total Items</span> {itemsCounter}
            </p>
            <p>
              <span>Total Payments</span> {total}
            </p>
          </div>
          <div className={Styles.buttonContainer}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "rgb(250, 63, 42)",
                width: { xs: "80px", sm: "120px" },
                height: { xs: "20px", sm: "30px" },
                fontSize: { xs: "10px", sm: "15px" },
                "&:hover": { bgcolor: "rgb(243 77 58)" },
              }}
              onClick={() => dispatch(clear())}
            >
              Clear
            </Button>
            {getCookie("token") ? (
              <Button
                variant="contained"
                sx={{
                  bgcolor: "green",
                  "&:hover": { bgcolor: "#179d17" },
                  width: { xs: "80px", sm: "120px" },
                  height: { xs: "20px", sm: "30px" },
                  fontSize: { xs: "10px", sm: "15px" },
                }}
                onClick={() => getPayments()}
              >
                Checkout
              </Button>
            ) : (
              <Button
                onClick={() => navigate("/login")}
                variant="contained"
                sx={{
                  bgcolor: "orange",
                  "&:hover": { bgcolor: "#f2a922" },
                  width: { xs: "80px", sm: "120px" },
                  height: { xs: "20px", sm: "30px" },
                  fontSize: { xs: "10px", sm: "15px" },
                }}
              >
                Continue
              </Button>
            )}
          </div>
        </section>
      )}

      {/* Map on selected products */}
      <div className={Styles.products}>
        {selectedItems.map((item) => (
          <section className={Styles.product}>
            <Cart data={item} key={item.id} />
          </section>
        ))}
      </div>

      {itemsCounter === 0 && (
        <section className={Styles.complete}>
          <h3>{message}</h3>
          <Button
            variant="contained"
            sx={{
              fontSize: { xs: "10px", sm: "14px" },
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onClick={() => navigate("/store")}
          >
            {/* <Link to='/store'> */}
            Go To Shop
          {/* </Link> */}
          </Button>
        </section>
      )}
    </main>
  );
};

export default ShopCart;
