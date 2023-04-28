import axios from "axios";

export const updateData = async (keyCode, name, file, id, token) => {

  const data = new FormData();
  data.append("title", keyCode);
  data.append("text", name);
  data.append("image", file);
  data.append("tags", "four,five,six");

  try {
    const res = await axios.patch(
      `https://api.freerealapi.com/panel/blogs/${id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return {
      success: true,
      error: "",
    };
  } catch (error) {
    return {
      status: false,
      error: error.message,
    };
  }
};
