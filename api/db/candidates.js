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

  addedby: {
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

  primaryStatus: {
    type: String,
    default: "New"
  },
  primaryStatussetby: {
    type: String
  },
  primaryStatussetbyusertype: {
    type: String
  },
  finalStatus: {
    type: String
  },
  finalStatusdate: {
    type: String
  },
  finalStatussetby: {
    type: String
  },
  source: {
    type: String
  },
  interviewed: {
    type: Boolean,
    default: false
  },

  interviewscheduled: {
    type: Boolean,
    default: false
  },

  allocatedtoshorltistdone: {
    type: Boolean,
    default: false
  },

  shortlisted: {
    type: Boolean,
    default: false
  },

  assignToshortlisterbyId: { type: String },
  assignToshortlisterbyName: { type: String },
  shortlister: { type: String },
  shortlisterName: { type: String },
  shortlistedDate: { type: String },
  allocatedDate: { type: String },
  shortlistStatus: { type: Boolean },

  //shortlistStatus: { type: Boolean },

  cvUrl: [
    {
      url: { type: String, default: null },
      recievedDate: { type: String, default: null },
      addedby: { type: String, default: null },
      jobspec: { type: String, default: null }
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
