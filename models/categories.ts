import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const { Schema } = mongoose;

const CategorySchema = new Schema({
  _id: { type: String, default: uuidv4 },
  name: String,
  icon: String,
  colorClass: String,
});

CategorySchema.virtual("id").set((value: string) => {
  if (value === null) {
    return uuidv4();
  }
  return value;
});

module.exports = mongoose.model("Category", CategorySchema);
