const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var candidateSchema = new Schema({
  email: {
    type: String
  },
  name: {
    type: String
  },
  jobspec: {
    type: String
  },
  date: {
    type: Date
  },
  status: {
    type: String
  },evaluationData:{
    evaluatorId:String,
    evaluationMarks:Number,
    acadamicBackground:String,
    indusrtyExperiance:String,
    currentPosition:String,
    JobPeriod:String
  }
});

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;
