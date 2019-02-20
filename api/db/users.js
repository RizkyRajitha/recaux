const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
//const crypto = require("crypto");
const bcrypt = require("bcryptjs");

saltRounds = 10;

var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: {
    type: String
  },
  hash: {
    type: String
  },
  emailverified: {
    type: Boolean
  }
});

userSchema.pre("save", function(next) {
  console.log("savin.....");
  this.salt = bcrypt.genSaltSync(saltRounds);
  this.hash = bcrypt.hashSync(this.hash, this.salt);

  next();
});

// userSchema.pre("update", function(next) {
//   console.log("updating.....");
//   this.salt = bcrypt.genSaltSync(saltRounds);
//   const hash = bcrypt.hashSync(this.hash, this.salt);
//   this.update({}, { $set: { hash: hash } });
//   next();
// });

// userSchema.methods.setpass = function(password) {
//   console.log(this.email);
//   console.log("in set pass");
//   const sslat = bcrypt.genSaltSync(saltRounds);
//   const hashpassword = bcrypt.hashSync(password, sslat);
//   this.hash = hashpassword;
//   //this.salt = sslat;
//   console.log(this.hash);
// };

// console.log(this.email);
// this.salt = crypto.randomBytes(16).toString("hex");
// console.log(`salt = ${this.salt}`);
// this.hash = crypto
//   .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
//   .toString("hex");

userSchema.methods.verifypass = function(password) {
  console.log("very pass - " + this.email + "\n hash - " + this.hash);
  const sts = bcrypt.compareSync(password, this.hash);
  console.log(" pass verified - " + sts);
  return sts;
};
// });

// console.log("this name - " + this.email);
// console.log("salt - " + this.salt);
// console.log("pass - " + password);
// userr = this;
// const hash = crypto
//   .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
//   .toString("hex");
// return hash === this.hash;

userSchema.methods.generateJWT = function() {
  console.log("inside genJWT");

  // console.log(this.email)

  return jwt.sign(
    {
      email: this.email,
      id: this._id,
      emailverified: this.emailverified
    },
    "authdemo",
    { expiresIn: "10m" }
  );
};

// userSchema.methods.getAuthToken = () => {
//   return { _id: this._id, email: this.email, token: this.generateJWT() };
// };

const User = mongoose.model("User", userSchema);

module.exports = User;
