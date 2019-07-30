const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var nortificationSchema = new Schema({
  title: { type: String },
  dis: { type: String },
  timeCre: { type: String },
  userIdShow: [],
  viwed: { type: Boolean, default: false },
  candidateId: { type: String }
});

const Notifications = mongoose.model("Notifications", nortificationSchema);

module.exports = Notifications;
