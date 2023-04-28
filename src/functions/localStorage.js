const getLocalStorage = (name) => {
  if (localStorage.getItem(name)) {
    return JSON.parse(localStorage.getItem(name));
  }
  return false;
};

const setLocalStorage = (name, value) => {
  localStorage.setItem(name, JSON.stringify(value));
};

export { getLocalStorage, setLocalStorage };
