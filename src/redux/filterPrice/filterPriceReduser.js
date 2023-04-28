const initiallState = {
  products: [],
  number: "",
  layout: "",
};

const filterPriceReduser = (state = initiallState, action) => {
  switch (action.type) {
    case "FILTER_PRICE":
      const filterPrice = action.payload.products.filter(
        (item) => parseInt(item.price) > action.payload.priceUser
      );
      return {
        products: filterPrice,
        number: +action.payload.priceUser,
      };
    case "PRICE_IS_GOING_UP":
      const priceIsGoingUp = action.payload
        .concat()
        .sort((a, b) => a.price - b.price);
      return {
        products: priceIsGoingUp,
        layout: action.type,
      };
    case "PRICE_IS_GOING_DOWN":
      const priceIsGoingDown = action.payload
        .concat()
        .sort((a, b) => b.price - a.price);
      return {
        products: priceIsGoingDown,
        layout: action.type,
      };

    default:
      return state;
  }
};

export default filterPriceReduser;
