const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  ProjectID: { type: String, required: true },
  ProjectName: { type: String, required: true },
  StartDate: { type:String, required: true },
  EndDate: { type: String, required: true },
  TeamMembers: [{ type: String, required: true }],
  Tasks: { 
    //type: String, 
    //required: true 
  },
  Progress: { type: Number },
  Comments: [{ type: String }],
  Metrics: {
    ProjectProgress: { type: Number, required: true }
  }
});


const prod = mongoose.model('projects', projectSchema);

module.exports = prod
