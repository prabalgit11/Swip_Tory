const mongoose = require('mongoose')
const BookmarkedSlidesSchema = new mongoose.Schema({
    userId: String,
    slideId: String,
});
const BookmarkedSlides = mongoose.model('BookmarkedSlides', BookmarkedSlidesSchema);
module.exports = BookmarkedSlides; 