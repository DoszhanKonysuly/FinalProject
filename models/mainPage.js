// models/mainPage.js
const mongoose = require('mongoose');

const mainPageSchema = new mongoose.Schema({
    carouselImages: [String], 
    title: String,
    description: String,
    titleColor: String, 
    descriptionColor: String 
});

const MainPage = mongoose.model('MainPage', mainPageSchema);

module.exports = MainPage;
