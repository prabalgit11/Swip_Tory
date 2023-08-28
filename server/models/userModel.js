const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    bookmarksStories: [],
});

module.exports = new mongoose.model("user", userSchema);
