const {
  getAll,
  getById,
  addNewContact,
  deleteContact,
  updateContact,
} = require("../../controlers/contacts");

const express = require("express");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", addNewContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", updateContact);

module.exports = router;
