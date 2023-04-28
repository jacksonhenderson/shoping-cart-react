const getSaves = () => {
  return {
    type: "GET_SAVES",
  };
};

const addProduct = (product) => {
  return {
    type: "SAVE_PRODUCT",
    payload: product,
  };
};

const delProduct = (product) => {
  return {
    type: "DEL_PRODUCT",
    payload: product,
  };
};

export { addProduct, delProduct, getSaves };
