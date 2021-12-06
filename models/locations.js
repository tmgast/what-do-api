const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const { Schema } = mongoose;

const LocationSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  name: String,
  category: {
    type: String,
    enum: ['landmark', 'music', 'park', 'station', 'airport'],
    default: 'landmark',
  },
  latitude: String,
  longitude: String,
  url: String,
  rating: { type: Number, default: 0 },
});

LocationSchema.virtual('id').set((value) => {
  if (value === null) {
    return uuidv4();
  }
  return value;
});

module.exports = mongoose.model('Location', LocationSchema);
