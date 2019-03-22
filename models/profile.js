const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        required: true,
        max: 20
    },
    classroom: {
        type: String,
        required: true
    },
    numberinclassroom: {
        type: Number,
        required: true
    },
    update: { type: Date, default: Date.now }
}, { collection: 'profile' }
);

module.exports = mongoose.model('profile', ProfileSchema);