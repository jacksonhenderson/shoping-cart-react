import axios from "axios";

const authentication = async (data, type) => {
  if (type === "signup") {
    try {
      const res = await axios.post(
        "https://api.freerealapi.com/auth/register",
        data
      );
      document.cookie = `token = ${res.data.token};max-age=7200;path=/; `;
      return {
        success: true,
        message: res.data.message,
        error: "",
      };
    } catch (error) {
      return {
        success: false,
        message: error.response.data.message,
        error: error.message,
      };
    }
  }

  if (type === "login") {
    try {
      const res = await axios.post(
        "https://api.freerealapi.com/auth/login",
        data
      );
      document.cookie = `token = ${res.data.token};max-age=7200;path=/; `;

      return {
        success: true,
        message: res.data.message,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response.data.message,
      };
    }
  }
};

export default authentication;
