const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var nortificationSchema = new Schema({
  title: { type: String },
  dis: { type: String },
  timeCre: { type: String },
  userIdShow: { type: String },
  viwed: { type: Boolean, default: false }
  
});

const Notifications = mongoose.model("Notifications", nortificationSchema);

module.exports = Notifications;
