const mongoose = require('mongoose');

const contactFormSchema = mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    number: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 13    
    },
    country: {
        type: String,
    },
    message: {
        type: String,
    }
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const userData = mongoose.model('user', contactFormSchema);
module.exports = userData;