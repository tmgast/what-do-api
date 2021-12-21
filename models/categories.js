const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const { Schema } = mongoose;

const CategorySchema = new Schema({
  _id: { type: String, default: uuidv4 },
  name: String,
  icon: String,
  colorClass: String,
});

CategorySchema.virtual("id").set((value) => {
  if (value === null) {
    return uuidv4();
  }
  return value;
});

module.exports = mongoose.model("Category", CategorySchema);
