const {
  getAll,
  getById,
  addNewContact,
  deleteContact,
  updateContact,
  updateStatusContact,
} = require("../../controlers/contacts");
const express = require("express");
const {
  validationBody,
  validationBodyFavorite,
} = require("../../middlewares/addValidation");
const {
  addContactSchema,
  updateFavoriteSchema,
} = require("../../models/contact");
const { isValidId } = require("../../middlewares/isValidId");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", isValidId, getById);

router.post("/", validationBody(addContactSchema), addNewContact);

router.delete("/:contactId", isValidId, deleteContact);

router.put(
  "/:contactId",
  validationBody(addContactSchema),
  isValidId,
  updateContact
);

router.patch(
  "/:contactId/favorite",
  validationBodyFavorite(updateFavoriteSchema),
  isValidId,
  updateStatusContact
);

module.exports = router;
