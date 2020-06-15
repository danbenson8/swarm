const Joi = require('joi');
const Session = require('../models/session.model');

const sessionSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    status: Joi.string(),
    participants: Joi.array(),
    license: Joi.string(),
})


module.exports = {
    insert
}

async function insert(session) {
    session = await Joi.validate(session, sessionSchema, { abortEarly: false });
    return await new Session(session).save();
}

// TODO confirmation email w/ nodemailer
