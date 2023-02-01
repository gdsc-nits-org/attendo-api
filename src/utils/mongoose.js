function objectIdChecker(id) {
  if (id) {
    return id.match(/^[0-9a-fA-F]{24}$/);
  }
  return false;
}

module.exports = { objectIdChecker };
