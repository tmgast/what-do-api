const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const { Schema } = mongoose;

const UsersSchema = new Schema({
  id: { type: String, default: uuidv4() },
  name: String,
  email: String,
});

module.exports = mongoose.model('UsersModel', UsersSchema);
