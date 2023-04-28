import React, { useEffect } from "react";
import { getLocalStorage, setLocalStorage } from "../../functions/localStorage";
const ChekedLocalStorage = () => {
  useEffect(() => {
    //Cheked Savas
    if (!getLocalStorage("saveProducts")) setLocalStorage("saveProducts", []);
    //Cheked Orders
    if (!getLocalStorage("orders")) setLocalStorage("orders", []);
    //Cheled Cart
    if (!getLocalStorage("carts"))
      setLocalStorage("carts", {
        selectedItems: [],
        itemsCounter: 0,
        total: 0,
      });
  }, []);
  return;
};

export default ChekedLocalStorage;
