const mongoose = require('mongoose');

const { Schema } = mongoose;

const LocationsSchema = new Schema({
  id: String,
  name: String,
  latitude: String,
  longitude: String,
  url: String,
  rating: { type: Number, default: 0 },
});

const LocationsModel = mongoose.model(
  'LocationsModel',
  LocationsSchema,
);
