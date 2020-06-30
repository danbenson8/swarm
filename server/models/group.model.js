const mongoose = require('mongoose');

/**
 * schema describing the user document collection
 * @param _user ref to User
 * @param type user type (owner/admin/member)
 */
const MemberSchema = new mongoose.Schema({
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  membership: {
    type: String,
    enum: Object.values('owner', 'admin', 'member'),
    default: 'member'
  }
}, { _id: false });

/**
 * schema describing the user document collection
 * @param name group name
 * @param description group description
 * @param privacy group privacy settings (private/public)
 * @param createdAt date group created
 * @param members array of members incl. permissions per user
 */
const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  privacy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  members: [MemberSchema]
}, {
  versionKey: false
});

module.exports = mongoose.model('Group', GroupSchema, 'groups');
