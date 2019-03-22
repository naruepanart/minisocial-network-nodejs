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
        max: 40
    },
/*     stunametitle: { type: String, required: true },
    stufirstname: { type: String, required: true },
    stulastname: { type: String, required: true },
    stunickname: { type: String, required: true },
    stugender: { type: String, required: true },
    stuage: { type: Number, required: true },
    stutel: { type: Number, required: true },
    stutel2: { type: Number },
    stuclassroom: { type: String, required: true },
    stunumberinclassroom: { type: Number, required: true },

    social: {
        facebook: {
            type: String
        }
    }, */
    update: { type: Date, default: Date.now }
}, { collection: 'profile' }
);

module.exports = mongoose.model('profile', ProfileSchema);