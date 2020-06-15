const express = require('express');
const passport = require('passport')
const asyncHandler = require('express-async-handler');
const utilCtrl = require('../controllers/util.controller');
const config = require('../config/config');

const router = express.Router();
module.exports = router;

router.post('/group', passport.authenticate('jwt', { session: false }), asyncHandler(getGroup));

async function getGroup(req, res) {
  let query = await utilCtrl.queryGroup(req.body);
  let members = [];
  query.forEach(el => {
    members.push({
      _id: el._id,
      forename: el.forename,
      lastname: el.surname,
      email: el.email,
      license: el.license,
      groups: el.groups,
    });
  })
  res.json({ members: members })
}