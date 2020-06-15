const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/user.model');

// TODO dynamic upgrade tokens

const updateSchema = Joi.object({
  forename: Joi.string().allow(null),
  surname: Joi.string().allow(null),
  email: Joi.string().email().allow(null),
  newPW: Joi.string().allow(null),
  repeatPW: Joi.string().valid(Joi.ref('newPW')).allow(null),
  upgradeToken: Joi.string().allow(null),
})

const userSchema = Joi.object({
  forename: Joi.string().required(),
  surname: Joi.string().required(),
  email: Joi.string().email(),
  password: Joi.string().required(),
  repeatPassword: Joi.string().required().valid(Joi.ref('password')),
  license: Joi.string(),
})


module.exports = {
  insert,
  update
}

// TODO confirmation email w/ nodemailer

async function insert(user) {
  user = await Joi.validate(user, userSchema, { abortEarly: false });
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  return await new User(user).save();
}

async function update(_id, user) {
  console.log(_id);
  user = await Joi.validate(user, updateSchema, { abortEarly: false });
  Object.keys(user).forEach((key) => (user[key] == null) && delete user[key]);
  return await User.findByIdAndUpdate(_id, user, { new: true })
}