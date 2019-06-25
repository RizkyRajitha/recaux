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
  skills: [],
  status: {
    type: String,
    default: "New"
  },
  statusHr: {
    type: String
  },

  source: {
    type: String
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
  shortlisterName: { type: String },
  shortlistedDate: { type: String },
  allocatedDate: { type: String },
  shortlistStatus: { type: Boolean },
  cvUrl: [
    {
      url: { type: String, default: null },
      recievedDate: { type: String, default: null }
    }
  ]

  /**
 * {
      candidateId: { type: String },
      allocatedbyUserId: { type: String },
      allocatedDate: { type: String },
      allocatedUserName:{type:String},
      shortlistedDate: { type: String },
      shortlistStatus: { type: Boolean ,default:false}
    }
 */
});

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;
