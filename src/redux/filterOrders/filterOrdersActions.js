const allPayments = (orders) => {
  return {
    type: "ALL_PAYMENTS",
    payload: orders,
  };
};

const SuccessfulPayments = (orders) => {
  return {
    type: "SUCCESS_FULPAYMENTS",
    payload: orders,
  };
};

const unsuccessfulPayments = (orders) => {
  return {
    type: "UNSUCCESS_FULPAYMENTS",
    payload: orders,
  };
};

export { SuccessfulPayments, unsuccessfulPayments, allPayments };
