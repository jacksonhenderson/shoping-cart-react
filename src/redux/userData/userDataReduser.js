const initiallState = {
  loading: false,
  data: {},
  error: "",
};

const userDataReduser = (state = initiallState, action) => {
  switch (action.type) {
    case "FETCH_USER_DATA_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "FETCH_USER_DATA_SUCCESS":
      return {
        loading: false,
        data: action.payload,
      };

    case "FETCH_USER_DATA_FAILURE":
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userDataReduser;
