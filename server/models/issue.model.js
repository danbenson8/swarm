const mongoose = require('mongoose');

/**
 * schema describing an event (change of vote)
 * @param _user a reference to the user that made the vote
 * @param _from a reference to the last vote
 * @param _to a reference to the new vote
 * @param date the time the vote was made
 */
const EventSchema = new mongoose.Schema({
    _user: {
        type: Schema.Types.ObjectID,
        ref: 'User'
    },
    _from: {
        type: Schema.Types.ObjectID,
        ref: 'Solution'
    },
    _to: {
        type: Schema.Types.ObjectID,
        ref: 'Solution'
    },
    date: {
        type: Date,
        default: Date.now
    },
}, {
    _id: false
});

/**
 * schema describing the issue document collection
 * @param _user a reference to the user who created the issue
 * @param title brief description
 * @param description full description
 * @param created date created
 * @param solutions a list of references to possible solutions (see Solution Schema)
 * @param events a list of events from the deliberation over this issue
 */
const IssueSchema = new mongoose.Schema({
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
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    },
    solutions: [{
        type: Schema.Types.ObjectID,
        ref: 'Solution'
    }],
    events: [EventSchema],
});

module.exports = mongoose.model('Issue', IssueSchema, 'issues');
