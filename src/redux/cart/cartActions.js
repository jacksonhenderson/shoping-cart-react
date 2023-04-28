import { getLocalStorage, setLocalStorage } from "../../functions/localStorage";

const initialState = {
  selectedItems: [],
  itemsCounter: 0,
  total: 0,
};

const sumItems = (items) => {
  const itemsCounter = items.reduce(
    (total, product) => total + product.quantity,
    0
  );
  let total = items
    .reduce((total, product) => total + product.price * product.quantity, 0)
    .toFixed(2);
  return { itemsCounter, total };
};

const cartReducer = (state = getLocalStorage("carts"), action) => {
  switch (action.type) {
    case "ADD_ITEM":
      if (!state.selectedItems.find((item) => item.id === action.payload.id)) {
        state.selectedItems.push({
          ...action.payload,
          quantity: 1,
        });
      }
      var newItems = {
        ...state,
        selectedItems: [...state.selectedItems],
        ...sumItems(state.selectedItems),
      };
      setLocalStorage("carts", newItems);
      return getLocalStorage("carts");
    case "REMOVE_ITEM":
      const newSelectedItems = state.selectedItems.filter(
        (item) => item.id !== action.payload.id
      );
      var newItems = {
        ...state,
        selectedItems: [...newSelectedItems],
        ...sumItems(newSelectedItems),
      };
      setLocalStorage("carts", newItems);
      return getLocalStorage("carts");
    case "INCREASE":
      const indexI = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.selectedItems[indexI].quantity++;
      var newItems = {
        ...state,
        ...sumItems(state.selectedItems),
      };
      setLocalStorage("carts", newItems);
      return getLocalStorage("carts");
    case "DECREASE":
      const indexD = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.selectedItems[indexD].quantity--;
      var newItems = {
        ...state,
        ...sumItems(state.selectedItems),
      };
      setLocalStorage("carts", newItems);
      return getLocalStorage("carts");
    case "CLEAR":
      var newItems = {
        selectedItems: [],
        itemsCounter: 0,
        total: 0,
      };
      setLocalStorage("carts", newItems);
      return getLocalStorage("carts");
    default:
      return getLocalStorage("carts");
  }
};

export default cartReducer;
