const initiallState = {
  loading: false,
  products: [],
  error: "",
};

const productsReduser = (state = initiallState, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "FETCH_PRODUCTS_SUCCESS":
      return {
        loading: false,
        products: action.payload,
      };

    case "FETCH_PRODUCTS_FAILURE":
      return {
        loading: false,
        products: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productsReduser;
