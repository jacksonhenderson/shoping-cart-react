import { shorten } from "../../functions/functions";

const initiallState = [];

const searchReduser = (state = initiallState, action) => {
  switch (action.type) {
    case "SEARCH":
      if (action.payload.value.length > 1) {
        const searchd = action.payload.data.filter((item) =>
          shorten(item.title)
            .toLowerCase()
            .includes(action.payload.value.toLowerCase())
        );
        return searchd;
      }
    default:
      return state;
  }
};

export default searchReduser;
