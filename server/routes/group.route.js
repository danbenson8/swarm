const express = require('express');
const passport = require('passport')
const asyncHandler = require('express-async-handler');
const groupCtrl = require('../controllers/group.controller');
const config = require('../config/config');

const router = express.Router();
module.exports = router;

router.post('/new', passport.authenticate('jwt', { session: false }), asyncHandler(insert));
router.post('/detail', passport.authenticate('jwt', { session: false }), asyncHandler(detail));
router.post('/join', passport.authenticate('jwt', { session: false }), asyncHandler(join));
router.post('/leave', passport.authenticate('jwt', { session: false }), asyncHandler(leave));

async function insert(req, res) {
  let group = await groupCtrl.insert(req.user._id, req.body);
  res.json(group);
}

async function detail(req, res) {
  let group = await groupCtrl.detail(req.body);
  res.json(group);
}

async function join(req, res) {
  let group = await groupCtrl.join(req.body);
  res.json(group)
}

async function leave(req, res) {
  let group = await groupCtrl.leave({
    user_id: req.user._id.toString(),
    group_id: req.body._id
  });
  res.json(group);
}