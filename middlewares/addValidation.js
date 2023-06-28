const { HttpError } = require("../helpers/HttpError");
const { addSchema } = require("../helpers/validation");

const addValidation = (req, res, next) => {
  const { error } = addSchema.validate(req.body);
  console.log(error);
  if (error) {
    next(HttpError(400, error.message));
  }
  next();
};

const updateValidation = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    next(HttpError(400, "Missing fields"));
  }
  const { error } = addSchema.validate(req.body);
  if (error) {
    next(HttpError(400, error.message));
  }
  next();
};

module.exports = { addValidation, updateValidation };
