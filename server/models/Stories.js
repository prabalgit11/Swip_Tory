const mongoose = require('mongoose')
const Story_schema = new mongoose.Schema({
    user_name: String,
})
const Stories = mongoose.model('story', Story_schema)
module.exports = Stories;
