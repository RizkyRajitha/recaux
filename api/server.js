const express = require("express");
const path = require("path");
const eh = require("errorhandler");
const cors = require("cors");
const mongoose = require("mongoose");
const es = require("express-session");
const bp = require("body-parser");
const passport = require("passport");

mongoose.Promise = global.Promise;

const mongodbAPI = "mongodb://127.0.0.1:27017/authdb";
const app = express();
app.use(passport.initialize());
app.use(cors());
app.use(require("morgan")("dev"));
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

const uu = require("./routes/userroute");

app.use("/usr", require("./routes/routes"));

// app.get("/user", (req,res)=>{

//   console.log(req.params.id)
//   res.send("oookk")


// });

app.use(eh());

const user = require("./db/users");
//const passport = require("./config/passport");

mongoose.connect(mongodbAPI, { useNewUrlParser: true }, err => {
  if (!err) console.log("connected to mongodb sucsessfully");
  console.log("👍");
});
mongoose.set("debug", true);

app.listen(3001, () => {
  console.log("listning on 3001");
});
