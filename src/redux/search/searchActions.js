const searchd = (data, value) => {
  return {
    type: "SEARCH",
    payload: { data, value },
  };
};

export default searchd;
