const { HttpError } = require("../helpers/HttpError");
const { Contact } = require("../models/contact");

const getAll = async (req, res, next) => {
  try {
    const { user } = req;
    const result = await Contact.find({ owner: user._id });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { user } = req;
    const { contactId } = req.params;
    const result = await Contact.find({ owner: user._id, _id: contactId });
    if (result.length === 0) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addNewContact = async (req, res, next) => {
  try {
    const { user } = req;
    const result = await Contact.create({ ...req.body, owner: user._id });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { user } = req;
    const { contactId } = req.params;
    const result = await Contact.findOneAndDelete({
      owner: user._id,
      _id: contactId,
    });
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { user } = req;
    const { contactId } = req.params;
    const result = await Contact.findOneAndUpdate(
      {
        owner: user._id,
        _id: contactId,
      },
      req.body,
      {
        new: true,
      }
    );
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { user } = req;
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(
      {
        owner: user._id,
        _id: contactId,
      },
      req.body,
      {
        new: true,
      }
    );
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  addNewContact,
  deleteContact,
  updateContact,
  updateStatusContact,
};
