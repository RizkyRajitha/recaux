const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let OutSourceProject = new Schema({                                                               

  out_Name: {
    type: String
  },

  out_Designation: {
    type: String
  },

  out_ExeProfile: {
    type: String
  },
 
  out_CandidateID: {
      type: String
  },

 /*  Company: {
    type: String
  },

  DesignationP: {
    type: String
  },

  Duration: {
    type: Date
  },

  Environment: {
    type: String
  },

  TechnologiesP: {
    type: String
  }, */


  out_Qualification: {
    type: String
  },
  
});

module.exports = mongoose.model("OutSourceProject", OutSourceProject);
