const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
    email: { type: String, required: true },
    issue: { type: String, required: true },
    // augmented permissions
    permissions: {}
})

const SolutionSchema = new mongoose.Schema({
    email: { type: String, required: true },
    solution: { type: String, required: true, unique: true },

})



const DeliberationSchema = new mongoose.Schema({

})

// module.exports = mongoose.model('Deliberation', DeliberationSchema);
