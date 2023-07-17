const { User } = require("../models/user");
const { HttpError } = require("../helpers/HttpError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const jimp = require("jimp");
dotenv.config();

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const { SECRET_KEY } = process.env;

const registration = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, "Email is already in use");
    }
    const avatarURL = gravatar.url(email);
    const result = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
    });
    res.status(201).json({
      user: { email: result.email, subscription: result.subscription },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "22h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({
    message: "Logout succesfull",
  });
};
const getCurrent = async (req, res, next) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

const changeAvatar = async (req, res, next) => {
  try {
    const { email, _id } = req.user;
    const { path: tempUpload } = req.file;
    const resizedAvatar = await jimp.read(tempUpload);
    await resizedAvatar.resize(250, 250);
    await resizedAvatar.writeAsync(tempUpload);
    const [uniqName] = email.split("@");
    const resultUpload = path.join(avatarsDir, `${uniqName}.jpg`);
    const avatarURL = path.join("avatars", `${uniqName}.jpg`);
    await fs.rename(tempUpload, resultUpload);
    const result = await User.findByIdAndUpdate(_id, { avatarURL });

    if (!result) {
      throw HttpError(401, "Not authorized");
    }
    res.json({ avatarURL });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registration,
  login,
  logout,
  getCurrent,
  changeAvatar,
};
