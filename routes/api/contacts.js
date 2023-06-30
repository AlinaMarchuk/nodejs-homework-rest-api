const {
  getAll,
  getById,
  addNewContact,
  deleteContact,
  updateContact,
} = require("../../controlers/contacts");
const express = require("express");
const { validationBody } = require("../../middlewares/addValidation");
const { addSchema } = require("../../helpers/validation");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", validationBody(addSchema), addNewContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", validationBody(addSchema), updateContact);

module.exports = router;
