const mongoose = require('mongoose')
const Slide_schema = new mongoose.Schema({
    heading: String,
    description: String,
    image_url: String,
    categories: String,
    story_id: String,
    bookmarks: Boolean,
    likes: Number,
})
const Slides = mongoose.model('slide', Slide_schema)
module.exports = Slides;