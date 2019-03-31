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
  },
  evaluation:{
    marks:Number,
    
  }
});

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;
