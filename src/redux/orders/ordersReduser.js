import { getLocalStorage, setLocalStorage } from "../../functions/localStorage";

const initiallState = [];

const ordersReduser = (state = getLocalStorage("orders"), action) => {
  switch (action.type) {
    case "GET_ORDERS":
      return getLocalStorage("orders");

    case "SUCCESSFUL_ORDER":
      var order = {
        ...action.payload,
        status: true,
      };
      var orders = [...state, order];

      setLocalStorage("orders", orders);
      return getLocalStorage("orders");

    case "UNSUCCESSFUL_ORDER":
      var order = {
        ...action.payload.order,
        status: false,
      };
      var orders = [...state, order];
      setLocalStorage("orders", orders);
      return getLocalStorage("orders");

    case "CLEAR_ORDERS":
      setLocalStorage("orders", []);
      return getLocalStorage("orders");
    default:
      return state;
  }
};

export default ordersReduser;
