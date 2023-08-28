const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    userId: String,
    imageurl: String,
    category: String,
    heading: String,
    description: String,
    likes: [],
});

module.exports = new mongoose.model("story", storySchema);