const mongoose = require('mongoose');

// possible user licenses
const Licenses = Object.freeze({
  Admin: 'admin',
  Pro: 'pro',
  Basic: 'basic',
})

/**
 * schema describing the user document collection
 * @param forename user first name
 * @param surname user last name
 * @param email user email - also serves as login name
 * @param hashedPassword hashed user password
 * @param createdAt date user account was created
 * @param license current user license
 * @param groups a list of group memberships. users can only add members of their group(s) to a session
 */
const UserSchema = new mongoose.Schema({
  forename: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
    match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
  },
  hashedPassword: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  license: {
    type: String,
    enum: Object.values(Licenses),
    default: 'basic'
  },
  groups: [String]
}, {
  versionKey: false
});

Object.assign(UserSchema.statics, {
  Licenses
})


module.exports = mongoose.model('User', UserSchema, 'users');
