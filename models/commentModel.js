const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
  ProjectID: {
    type: String,
    required: true,
  },
  ProjectName: {
    type: String,
    required: false,
  },
  Author: {
    type: String,
    required: true,
  },
  Content: {
    type: String,
    required: true,
  },
  Timestamp: {
    type: Date,
    required: true,
  }
});


module.exports = mongoose.model("comments", commentsSchema);
