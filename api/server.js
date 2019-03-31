const express = require("express");
const path = require("path");
const eh = require("errorhandler");
const cors = require("cors");
const mongoose = require("mongoose");
const bp = require("body-parser");
const passport = require("passport");

//const keys = require("./config/keys");
const port = process.env.PORT || 3001;

mongoose.Promise = global.Promise;
//"mongodb://127.0.0.1:27017/authdb" ||
const mongodbAPI = "mongodb://127.0.0.1:27017/authdb"; //keys.mongouri;
const app = express();
app.use(passport.initialize());
app.use(cors());
app.use(require("morgan")("dev"));
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());


app.use("/usr", require("./routes/routes"));

app.use(express.static("client/build"));

// app.get("/user", (req,res)=>{

//   console.log(req.params.id)
//   res.send("oookk")

// });

app.use(eh());

const user = require("./db/users");
//const passport = require("./config/passport");

try {
  mongoose.connect(mongodbAPI, { useNewUrlParser: true }, err => {
    if (!err) console.log("connected to mongodb sucsessfully" + "👍");
  });
} catch (error) {
  console.log(err);
}

mongoose.set("debug", true);

app.listen(port, () => {
  console.log("listning on 3001");
});
