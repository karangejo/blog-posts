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

const postDB = mongoose.connection.useDb("posts");

const postInfo = postDB.model("post", postSchema);

module.exports = postInfo;
