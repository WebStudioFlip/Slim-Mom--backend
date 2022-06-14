const { Schema, model } = require("mongoose");
const Joi = require("joi");

// eslint-disable-next-line
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minLength: 2,
      maxLength: 16,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegexp,
      unique: true,
      dropDups: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 6,
      maxLength: 20,
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verification token is required"],
    },
  },
  { versionKey: false, timestamps: false }
);

const addUserSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  name: Joi.string().alphanum().min(2).max(16).required(),
  password: Joi.string().min(6).max(20).required(),
});

const loginUserSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const emailValidationSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const schemas = {
  addUser: addUserSchema,
  loginUser: loginUserSchema,
  emailValidation: emailValidationSchema,
};

const User = model("user", userSchema);

module.exports = { User, schemas };
