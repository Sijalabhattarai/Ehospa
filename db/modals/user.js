const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    }
}, {
    timestamps: true
}
);

module.exports = mongoose.models.User || mongoose.model('User', userSchema);