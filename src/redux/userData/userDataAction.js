import axios from "axios";

const fetchUserDataRequest = () => {
  return {
    type: "FETCH_USER_DATA_REQUEST",
  };
};

const fetchUserDataSuccess = (userData) => {
  return {
    type: "FETCH_USER_DATA_SUCCESS",
    payload: userData,
  };
};

const fetchUserDataFailure = (error) => {
  return {
    type: "FETCH_USER_DATA_FAILURE",
    payload: error,
  };
};

export const fetchUserData = (token) => {
  return (dispatch) => {
    dispatch(fetchUserDataRequest());
    axios
      .get("https://api.freerealapi.com/panel/blogs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((res) => {
        const userData = res.data.blogs[0];
        dispatch(fetchUserDataSuccess(userData));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchUserDataFailure(errorMsg));
      });
  };
};
