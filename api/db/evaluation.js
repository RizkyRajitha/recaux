const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Evaluation = new Schema({
  name: {
    type: String
  },
  candidateId: {
    type: String
  },

  role: {
    type: String
  },
  date: {
    type: String
  },

  interviewedById: {
    type: String
  },

  interviewedByName: {
    type: String
  },
  academicBackground: {
    type: String
  },
  industryExperience: {
    type: String
  },
  currentPosition: {
    type: String
  },
  currentEmployer: {
    type: String
  },

  skill1: {
    type: String
  },
  skill2: {
    type: String
  },
  skill3: {
    type: String
  },

  skill4: {
    type: String
  },
  skill5: {
    type: String
  },
  skill6: {
    type: String
  },
  skill7: {
    type: String
  },
  skill8: {
    type: String
  },
  skill9: {
    type: String
  },
  skill10: {
    type: String
  },
  skill11: {
    type: String
  },
  skill12: {
    type: String
  },
  skill13: {
    type: String
  },
  skill14: {
    type: String
  },
  rate1: {
    type: String
  },
  rate2: {
    type: String
  },
  rate3: {
    type: String
  },
  rate4: {
    type: String
  },
  rate5: {
    type: String
  },

  rate6: {
    type: String
  },
  rate7: {
    type: String
  },
  rate7: {
    type: String
  },
  rate8: {
    type: String
  },
  rate9: {
    type: String
  },
  rate10: {
    type: String
  },
  rate11: {
    type: String
  },
  rate12: {
    type: String
  },
  rate13: {
    type: String
  },
  rate14: {
    type: String
  },
  overrallRating: {
    type: String
  },
  summary: {
    type: String
  },
  salary1: {
    type: String
  },
  salary2: {
    type: String
  },
  salary3: {
    type: String
  },
  salary4: {
    type: String
  },
  period1: {
    type: String
  },
  period2: {
    type: String
  },
  approveid: {
    type: String
  },

  approve: {
    type: String
  }
});

module.exports = mongoose.model("", Evaluation);
