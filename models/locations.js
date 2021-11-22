const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const { Schema } = mongoose;

const LocationsSchema = new Schema({
  id: { type: String, default: uuidv4() },
  name: String,
  latitude: String,
  longitude: String,
  url: String,
  rating: { type: Number, default: 0 },
});

module.exports = mongoose.model('LocationsModel', LocationsSchema);
