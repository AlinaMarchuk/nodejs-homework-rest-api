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
const authenticate = require("../../middlewares/authenticate");

const router = express.Router();

router.get("/", authenticate, getAll);

router.get("/:contactId", authenticate, isValidId, getById);

router.post("/", authenticate, validationBody(addContactSchema), addNewContact);

router.delete("/:contactId", authenticate, isValidId, deleteContact);

router.put(
  "/:contactId",
  authenticate,
  validationBody(addContactSchema),
  isValidId,
  updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validationBodyFavorite(updateFavoriteSchema),
  isValidId,
  updateStatusContact
);

module.exports = router;
