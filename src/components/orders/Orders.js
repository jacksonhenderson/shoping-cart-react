import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//create uniq id
import { v4 } from "uuid";
// dispatch
import {
  allPayments,
  SuccessfulPayments,
  unsuccessfulPayments,
} from "../../redux/filterOrders/filterOrdersActions";
import { clearOrders } from "../../redux/orders/ordersActions";
import { getOrders } from "../../redux/orders/ordersActions";
//Components
import Order from "./order/Order";
// func get Cooki
import { getCookie } from "../../functions/getCookie";
//Mui
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
//Styles
import Styles from "./Orders.module.css";

const Orders = () => {
  //Navigate
  const navigate = useNavigate();
  //Dispatch Orders
  const dispatch = useDispatch();
  const state = useSelector((state) => state.ordersState);
  const filter = useSelector((state) => state.filterOrdersState);
  const [valueSelected, setValueSelected] = useState("All");
  useEffect(() => {
    dispatch(getOrders());
  }, []);

  useEffect(() => {
    dispatch(allPayments(state));
  }, [state]);

  return (
    <main className={Styles.container}>
      {
        // Check user login
        getCookie("token") ? (
          state.length ? (
            <section>
              <section className={Styles.filterContainer}>
                <FormControl>
                  <InputLabel id="sort-by">Sort By</InputLabel>
                  <Select
                    sx={{
                      width: "240px",
                      height: "37px",
                    }}
                    label="Sort By"
                    labelId="sort-by"
                    id="sort-by"
                    value={valueSelected}
                    onChange={(e) => setValueSelected(e.target.value)}
                  >
                    <MenuItem
                      value="All"
                      onClick={() => dispatch(allPayments(state))}
                    >
                      All
                    </MenuItem>
                    <MenuItem
                      value="SuccessfulPayments"
                      onClick={() => dispatch(SuccessfulPayments(state))}
                    >
                      SuccessfulPayments
                    </MenuItem>
                    <MenuItem
                      value="UnsuccessfulPayments"
                      onClick={() => dispatch(unsuccessfulPayments(state))}
                    >
                      UnsuccessfulPayments
                    </MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  sx={{ bgcolor: "orange", "&:hover": { bgcolor: "#f2a922" } }}
                  onClick={() => dispatch(clearOrders())}
                >
                  Clear Orders
                </Button>
              </section>

              <section className={Styles.orders}>
                {
                  //Filter on purchases
                  filter.length ? (
                    filter.map((order) => <Order key={v4} order={order} />)
                  ) : (
                    <div className={Styles.filterOrders}>
                      <p>There is no item</p>
                    </div>
                  )
                }
              </section>
            </section>
          ) : (
            <section className={Styles.noneOrders}>
              <span>
                You have not bought the product yet. Make your first purchase
              </span>
            </section>
          )
        ) : (
          //Word message to the account
          <div className={Styles.login}>
            <section className={Styles.loginContainer}>
              <span>To view order records, please log in to your account</span>
              <div>
                <Button
                  variant="contained"
                  sx={{ width: "40px", height: "30px" }}
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  sx={{ width: "40px", height: "30px" }}
                  onClick={() => navigate("/signUp")}
                >
                  signUp
                </Button>
              </div>
            </section>
          </div>
        )
      }
    </main>
  );
};

export default Orders;
