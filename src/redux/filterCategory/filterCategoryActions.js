const filterCategory = (type, data) => {
  return {
    type: type,
    payload: data,
  };
};

export { filterCategory };
