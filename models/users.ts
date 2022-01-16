import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const { Schema } = mongoose;

const UserSchema = new Schema({
  id: { type: String, default: uuidv4() },
  name: String,
  email: String,
});

module.exports = mongoose.model('User', UserSchema);
