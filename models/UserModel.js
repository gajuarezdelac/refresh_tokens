const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please enter your name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
    },
    role: {
        type: Number,
        default: 0
    },
    avatar: {
        type: String,
        default: 'https://lh3.googleusercontent.com/ogw/ADGmqu8B4NcCE0jFmWEZlJyDJMoRlReOEN77Ek-PyeY20Q=s83-c-mo'
    }
},{
    timestamps: true
});

module.exports = mongoose.model("Users",userSchema);