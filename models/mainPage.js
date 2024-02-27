// models/mainPage.js
const mongoose = require('mongoose');

const mainPageSchema = new mongoose.Schema({
    carouselImages: [String], // Array of image URLs for carousel
    title: String,
    description: String,
    titleColor: String, // Color for the title
    descriptionColor: String // Color for the description
});

const MainPage = mongoose.model('MainPage', mainPageSchema);

module.exports = MainPage;
