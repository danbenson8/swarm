const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../controllers/user.controller');
const config = require('../config/config');
const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }))

router.route('/')
  .post(asyncHandler(insert));

router.post('/:id/update', passport.authenticate('jwt', { session: false }), asyncHandler(update));

async function insert(req, res) {
  let user = await userCtrl.insert(req.body);
  res.json(user);
}

async function update(req, res) {
  let user = await userCtrl.update(req.params.id, req.body);
  res.json(user);
}