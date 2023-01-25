function response(msg, status) {
  return {
    status,
    msg,
  };
}

function success(msg, status = 200) {
  return response(msg, status);
}

function error(msg = "Internal Server Error", status = 500) {
  return response(msg, status);
}

module.exports = { response, success, error };
