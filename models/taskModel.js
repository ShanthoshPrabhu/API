const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
  ParentProjectID: {
    type: String,
    required: true,
  },
  TaskID: {
    type: String,
    required: true,
  },
  TaskName: {
    type: String,
    required: true,
  },
  AssignedTo:{
    type: String,
    required: true,
  },
  Status: {
    type: String,
    enum:['Not Started','In Progress','Completed'],
    required: true,
  },
  StartDate: {
    type: String,
   },
  EndDate: {
    type: String,
  }
});

module.exports = mongoose.model("tasks", taskSchema);