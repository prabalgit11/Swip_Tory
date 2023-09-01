const mongoose = require('mongoose')
const User_schema = new mongoose.Schema({
    username: String,
    password: String
})
const Users = mongoose.model('person', User_schema)
module.exports = Users;