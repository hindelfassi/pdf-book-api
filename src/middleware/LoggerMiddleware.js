function Logger(req, res, next) {
  console.log(`${req.method} , path ${req.path}`);
  next();
}

module.exports = Logger;
