const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var InterviewSchema = new Schema({
  interviwerId: {
    type: String
  },
  interviwerName: {
    type: String
  },
  candidateId: {
    type: String
  },
  candidateName: {
    type: String
  },
  schedulerId: {
    type: String
  },
  schedulerName: {
    type: String
  },
  datetime: {
    type: String
  },
  interviewtype: {
    type: String
  },
  statusHrinterview: {
    type: String,
    default: "pending "
  },
  statusHrdate: {
    type: String
  },

  statusHrsetby: {
    type: String
  },

  panal: [],
  panalwname: []
});

const Interview = mongoose.model("Interview", InterviewSchema);

module.exports = Interview;
