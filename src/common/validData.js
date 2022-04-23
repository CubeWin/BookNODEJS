const _validData = (err) => {
  let status = 0;
  let message = "";
  let errMessage = [];
  let data = {};

  if (err.errors) {
    status = 401;
    const myError = err.errors;
    Object.keys(myError).map((error) => {
      let list = {};
      list["input"] = myError[error].index || error;
      list["message"] = myError[error].message;
      errMessage.push(list);
    });
    data = {
      title: err._message,
      errors: errMessage,
    };
  } else {
    status = err.status || 500;
    message =
      err.message || "No eres tu, somo nosotros. tenemos algunos problemas";
    data = { error: { status, message } };
  }
  return { status, data };
};

module.exports = { _validData };
