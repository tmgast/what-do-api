import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

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

LocationSchema.index({name: 'text'});

LocationSchema.virtual('id').set((value: string) => {
  if (value === null) {
    return uuidv4();
  }
  return value;
});

export default mongoose.model('Location', LocationSchema);
