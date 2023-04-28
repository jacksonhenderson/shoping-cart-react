import emailjs from "emailjs-com";

const sendComment = async (form) => {
  try {
    const send = await emailjs.sendForm(
      "service_1ipsd98",
      "template_k5g5rsf",
      form.current,
      "mkfBHYqT9u82_GpCA"
    );
    return {
      status: true,
      error: "",
    };
  } catch (error) {
    return {
      status: false,
      error: error.text,
    };
  }
};

export default sendComment;
