const filterPrice = (priceUser, products) => {
  return {
    type: "FILTER_PRICE",
    payload: { priceUser, products },
  };
};

const priceOrder = (type, data) => {
  return {
    type: type,
    payload: data,
  };
};
const noneFilter = (stateus) => {
  return {
    type: "NONE",
    payload: stateus,
  };
};

export { filterPrice, priceOrder, noneFilter };
