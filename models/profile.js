const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        required: true,
        max: 10
    },
    stunickname: { type: String, required: true },
    stugender: { type: String, required: true },
    stuage: { type: Number, required: true },
    stutel1: { type: String, required: true },
    stutel2: { type: String },
    stuclassroom: { type: String, required: true },
    stunumberinclassroom: { type: Number, required: true },
    facebook: { type: String },

    /* social: {
        facebook: {
            type: String
        }
    }, */
    
    update: { type: Date, default: Date.now }
}, { collection: 'profile' }
);

module.exports = mongoose.model('profile', ProfileSchema);