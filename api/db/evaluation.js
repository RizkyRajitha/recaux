const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var evaluationSchema = new Schema({
  evaluatorId: {
    type: String
  },
  candidateId: {
    type: String
  },
  evaluationMarks: { type: Number },
  acadamicBackground: {
    type: String
  },
  indusrtyExperiance: {
    type: String
  },
  currentPosition: {
    type: String
  },
  JobPeriod: {
    type: String
  }
});

const Evaluation = mongoose.model("Evaluation", evaluationSchema);

module.exports = Evaluation;
