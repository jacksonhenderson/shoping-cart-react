const initiallState = {
  products: [],
  type: "",
};

const filterCategoryReduser = (state = initiallState, action) => {
  switch (action.type) {
    case "ALL":
      return {
        products: action.payload,
        type: action.type,
      };
    case "MENS_CLOTHING":
      const filterd_MensClothing = action.payload.filter(
        (item) => item.category === "men's clothing"
      );
      return {
        products: filterd_MensClothing,
        type: action.type,
      };
    case "JEWELERY":
      const filterd_Jewelery = action.payload.filter(
        (item) => item.category === "jewelery"
      );
      return {
        products: filterd_Jewelery,
        type: action.type,
      };
    case "ELECTRONICS":
      const filterd_Electronics = action.payload.filter(
        (item) => item.category === "electronics"
      );
      return {
        products: filterd_Electronics,
        type: action.type,
      };
    case "WOMENS_CLOTHING":
      const filterd_WomensClothing = action.payload.filter(
        (item) => item.category === "women's clothing"
      );
      return {
        products: filterd_WomensClothing,
        type: action.type,
      };
    default:
      return state;
  }
};

export default filterCategoryReduser;
