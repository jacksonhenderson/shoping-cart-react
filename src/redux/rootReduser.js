import { combineReducers } from "redux";

//Redusers
import productsReduser from "./products/productsReduser";
import savePeoductReduser from "./saveProduct/saveProductReduser";
import productsOffersReduser from "./productsOffers/productsOffersReduser";
import cartReducer from "./cart/cartActions";
import filterCategory from "./filterCategory/filterCategoryReduser";
import searchReduser from "./search/searchReduser";
import filterPriceReduser from "./filterPrice/filterPriceReduser";
import ordersReduser from "./orders/ordersReduser";
import filterOrdersReduser from "./filterOrders/filterOrdersReduser";
import userDataReduser from "./userData/userDataReduser";

const rootReduser = combineReducers({
  productsState: productsReduser,
  savedState: savePeoductReduser,
  productsOffersState: productsOffersReduser,
  cartState: cartReducer,
  searchState: searchReduser,
  filterCategoryState: filterCategory,
  filterPriceState: filterPriceReduser,
  ordersState: ordersReduser,
  filterOrdersState: filterOrdersReduser,
  userDataState: userDataReduser,
});

export default rootReduser;
