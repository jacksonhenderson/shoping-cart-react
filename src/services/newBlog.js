import axios from "axios";
import file from "../img/iks.jpg";
import { ImageBlob } from "../functions/ImageBlob";

var blob = ImageBlob(file);
const imageFile = new File([blob], "image.png", blob);

const newBolg = async (token, name) => {
  let data = new FormData();
  data.append("title", "title");
  data.append("text", name);
  data.append("image", imageFile);
  data.append("tags", "one,two,three");

  try {
    const res = await axios.post(
      "https://api.freerealapi.com/panel/blogs/",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return true;
  } catch (error) {
    return false;
  }
};

export default newBolg;
