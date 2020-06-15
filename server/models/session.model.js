const mongoose = require('mongoose');

/**
 * schema describing a session
 * @param _user a reference to the user that created the session
 * @param title brief description
 * @param description full description
 * @param created date created
 * @param status status of session:
 * - open => issues / solutions can still be created / deleted / edited
 * - closed => issues / solutions locked. changes can no longer be made to issues or related solutions
 * - live => session currently in progress. changes can not be made to issues / solutions / participants
 * @param participants a list of reference to participating users
 * @param issues a list of issues to be deliberated over in this session
 */
const SessionSchema = new mongoose.Schema({
    _user: {
        type: Schema.Types.ObjectID,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['open', 'closed', 'live'],
        default: 'closed'
    },
    participants: [{
        type: Schema.Types.ObjectID,
        ref: 'User'
    }],
    issues: [{
        type: Schema.Types.ObjectID,
        ref: 'Issue'
    }]
});

module.exports = mongoose.model('Session', SessionSchema, 'sessions');
