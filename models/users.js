const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  stufirstname: { type: String, required: true },
  stulastname: { type: String, required: true },
  
  update: { type: Date, default: Date.now }
}, { collection: 'users' }
);

module.exports = mongoose.model('users', UserSchema);