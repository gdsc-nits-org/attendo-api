const Utils = require("../utils");

function idChecker(id, type = "params") {
  return (req, _res, next) => {
    if (!Utils.Mongoose.objectIdChecker(req[type][id])) {
      return next(Utils.Response.error(`Invalid ${id}`, 400));
    }
    return next();
  };
}

module.exports = idChecker;
