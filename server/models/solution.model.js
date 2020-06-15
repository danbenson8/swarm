const mongoose = require('mongoose');

/**
 * schema describing the solution document collection
 * @param _user a reference to the user who created the solution
 * @param title brief description
 * @param description full description
 * @param created date created
 */
const SolutionSchema = new mongoose.Schema({
    _user: {
        type: Schema.Types.ObjectID,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Solution', SolutionSchema, 'solutions');