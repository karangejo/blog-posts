const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  markdown: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("post", postSchema);
