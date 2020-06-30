const Joi = require('joi');
const mongoose = require('mongoose');
const Group = require('../models/group.model');
const User = require('../models/user.model');

const groupSchema = Joi.object({
  _id: Joi.string(),
  name: Joi.string(),
  description: Joi.string(),
  privacy: Joi.string(),
  members: Joi.array()
})

const memberSchema = Joi.object({
  _id: Joi.string().required(),
  _user: Joi.string().required(),
  membership: Joi.string(),
})

async function insert(user, body) {
  group = await Joi.validate(body, groupSchema, { abortEarly: false })
  group = await new Group(group).save()
  return await join({
    _id: group._id.toString(),
    _user: user._id.toString(),
    membership: 'owner'
  });
}

async function detail(body) {
  group = await Joi.validate(body, groupSchema, { abortEarly: false })
  return await Group
    .findById(group._id)
    .populate('members._user', '-createdAt -groups -license -hashedPassword')
}

async function join(body) {
  valid = await Joi.validate(body, memberSchema, { abortEarly: false })
  user = await User.updateOne(
    { _id: valid._user },
    {
      $push: {
        groups: valid._id
      }
    }
  )
  return await Group.updateOne(
    { _id: valid._id },
    {
      $push: {
        members: {
          _user: valid._user,
          membership: valid.membership
        }
      }
    }
  )
}

async function leave(body) {
  let idSchema = Joi.object({
    user_id: Joi.string().required(),
    group_id: Joi.string().required()
  });
  body = await Joi.validate(body, idSchema);
  i = await User.findByIdAndUpdate(body.user_id, { $pull: { groups: body.group_id } }, { new: true })
  j = await Group.findByIdAndUpdate(body.group_id, { $pull: { members: { _user: body.user_id } } }, { new: true })
  // Delete group if no members
  if (j.members.length === 0) {
    j = Group.findByIdAndDelete(body.group_id)
  }
  if (j.members !== []) {
    return 'Group Deleted'
  } else {
    return j
  }
}

module.exports = {
  insert: insert,
  detail: detail,
  join: join,
  leave: leave,
}