const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    profileImg: {
        type: String,
        // required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    addr: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    perposeOfUSe: {
        type: String
    },
    UploadedMedia: {
        type: Array,
        default: []
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('user', UserSchema);