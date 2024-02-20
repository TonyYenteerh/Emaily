const mongoose = require('mongoose');

// 等同於 const Schema = mongoose.Schema;
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    name: String
})

// create users collection if not exists
mongoose.model('users', userSchema);