const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var jobspecSchema = new Schema({
  value: {
    type: String
  },
  label: { type: String }
});

const Jobspec = mongoose.model("Jobspec", jobspecSchema);

module.exports = Jobspec;
