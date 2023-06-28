const {
  getAll,
  getById,
  addNewContact,
  deleteContact,
  updateContact,
} = require("../../controlers/contacts");
const express = require("express");
const {
  addValidation,
  updateValidation,
} = require("../../middlewares/addValidation");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", addValidation, addNewContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", updateValidation, updateContact);

module.exports = router;
