const Joi = require('joi');
const User = require('../models/user.model')

// if need token
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// TODO have a group collection listing users per group
// then:
// _id => user_id
// group => group_id
// search on group collection not user collection
const groupQuerySchema = Joi.object({
  _id: Joi.string().required(),
  group: Joi.string().required()
})

// TODO should only be able to query group members of open groups...
// ... or private groups you are a member of 
async function queryGroup(groupQuery) {
  query = await Joi.validate(groupQuery, groupQuerySchema, { abortEarly: false });
  return await User.find({ groups: query.group })
}

module.exports = {
  queryGroup
}