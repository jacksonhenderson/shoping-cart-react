const initiallState = [];

const filterOrdersReduser = (state = initiallState, action) => {
  switch (action.type) {
    case "ALL_PAYMENTS":
      return action.payload;
    case "SUCCESS_FULPAYMENTS":
      const SuccessfulPayments = action.payload.filter(
        (order) => order.status === true
      );
      return SuccessfulPayments;

    case "UNSUCCESS_FULPAYMENTS":
      const unsuccessfulPayments = action.payload.filter(
        (order) => order.status === false
      );
      return unsuccessfulPayments;
    case "CLEAR":
      return [];
    default:
      return state;
  }
};

export default filterOrdersReduser;
