// models/user.js
// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: 'user' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    pictures: [{ type: String, required: false}]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
