const initiallState = [];

const productsOffersReduser = (state = initiallState, action) => {
  switch (action.type) {
    case "PRODUCTS_OFFERS":
      function getMultipleRandom(arr, num) {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
      }

      return {
        state: getMultipleRandom(action.payload, 8),
      };

    default:
      return state;
  }
};

export default productsOffersReduser;
