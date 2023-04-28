const getOrders = () => {
  return { type: "GET_ORDERS" };
};

const unsuccessfulOrder = (order) => {
  return {
    type: "UNSUCCESSFUL_ORDER",
    payload: { order },
  };
};

const successfulOrder = (order) => {
  return {
    type: "SUCCESSFUL_ORDER",
    payload: order,
  };
};

const clearOrders = () => {
  return {
    type: "CLEAR_ORDERS",
  };
};

export { getOrders, successfulOrder, unsuccessfulOrder, clearOrders };
