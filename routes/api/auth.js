const express = require("express");
const { registrationSchema, loginSchema } = require("../../models/user");
const { validationBody } = require("../../middlewares/addValidation");
const {
  registration,
  login,
  logout,
  getCurrent,
} = require("../../controlers/auth");
const authenticate = require("../../middlewares/authenticate");

const router = express.Router();

router.post("/register", validationBody(registrationSchema), registration);
router.post("/login", validationBody(loginSchema), login);
router.post("/logout", authenticate, logout);
router.get("/current", authenticate, getCurrent);
module.exports = router;
