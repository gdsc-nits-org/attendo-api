const Utils = require("../utils");

async function errorHandler(err, _req, res, next) {
  if (err instanceof Error) {
    res.status(500).json(Utils.Response.error("Internal Server Error"));
  } else if (err) {
    res.status(err.status).json(err);
  } else {
    next();
  }
}

async function errorLogger(err, _req, _res, next) {
  if (err instanceof Error) {
    console.error(err);
  } else if (err) {
    console.error(`Error -> Code: ${err.status} | Message: ${err.msg}`);
  }

  next(err);
}

module.exports = { errorHandler, errorLogger };
