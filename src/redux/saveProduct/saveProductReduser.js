import { getLocalStorage, setLocalStorage } from "../../functions/localStorage";

const initiallState = [];

const savePeoductReduser = (
  state = getLocalStorage("saveProducts"),
  action
) => {
  switch (action.type) {
    case "GET_SAVES":
      return getLocalStorage("saveProducts");
    case "SAVE_PRODUCT":
      var savad = [...state, action.payload];

      setLocalStorage("saveProducts", savad);
      return getLocalStorage("saveProducts");

    case "DEL_PRODUCT":
      const newSaved = state.filter((item) => item.id !== action.payload.id);
      var savad = [...newSaved];
      setLocalStorage("saveProducts", savad);
      return getLocalStorage("saveProducts");
    default:
      return getLocalStorage("saveProducts");
  }
};

export default savePeoductReduser;
