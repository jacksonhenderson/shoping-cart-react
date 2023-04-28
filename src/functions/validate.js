export const Validate = (data, type) => {
  let errors = {};

  if (
    !data.email ||
    !/^[a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-z0-9]@[a-z0-9][-\.]{0,1}([a-z][-\.]{0,1})*[a-z0-9]\.[a-z0-9]{1,}([\.\-]{0,1}[a-z]){0,}[a-z0-9]{0,}$/.test(
      data.email
    )
  ) {
    errors.email = true;
  } else {
    delete errors.email;
  }

  if (type === "login") {
    if (!data.password || data.password.length < 8) {
      errors.password = true;
    } else {
      delete errors.password;
    }
  }

  if (type === "signup") {
    if (!data.name.trim()) {
      errors.name = true;
    } else {
      delete errors.name;
    }

    if (!data.password || data.password.length < 8) {
      errors.password = true;
    } else {
      delete errors.password;
    }

    if (!data.confrimPassword || data.password !== data.confrimPassword) {
      errors.confrimPassword = true;
    } else {
      delete errors.confrimPassword;
    }

    if (data.isAccepted) {
      delete errors.isAccepted;
    } else {
      errors.isAccepted = "Accept our regulations";
    }
  }

  if (type === "comment") {
    if (!data.name.trim()) {
      errors.name = true;
    } else {
      delete errors.name;
    }

    if (!data.message.trim()) {
      errors.message = true;
    } else {
      delete errors.message;
    }
  }

  return errors;
};
