const mongoose = require("mongoose");
const schema = mongoose.Schema;

const fileSchema = new schema({
  // image: { type: String },
  // title: { type: String, unique: true },
  // description: { type: String },
  filename: { type: String },
});

module.exports = BookList = mongoose.model("file", fileSchema);
