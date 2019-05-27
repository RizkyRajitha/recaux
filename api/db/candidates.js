const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var candidateSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String
  },
  jobspec: { 
    type: String
  },
  date: {
    type: String
  },
  status: {
    type: String,
    default: "New"
  },
  evaluationData: {
    evaluatorId: String,
    evaluationMarks: Number,
    acadamicBackground: String,
    indusrtyExperiance: String,
    currentPosition: String,
    JobPeriod: String
  },
  assignToshortlisterbyId: { type: String },
  assignToshortlisterbyName: { type: String },
  shortlister: { type: String },
  shortlisterName:{type:String},
  shortlistedDate: { type: String },
  shortlistStatus: { type: Boolean },
  cvUrl:{type:String , default:null}

});

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;
