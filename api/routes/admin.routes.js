const passport = require("passport");
const User = require("../db/users");
const ObjectID = require("mongodb").ObjectID;

exports.adminLogin = function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    console.log("ppppp");
    if (err) {
      console.log("error no user");
      return next(err);
    }
    if (!user) {
      console.log("error no1");
      console.log(info.message);
      return res.send(user);
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      } else {
        console.log("done");
        console.log(user);

        var token = user.generateJWT();
        // res.cookie("jwt", token, { httpOnly: true, secure: true });
        return res.status(200).send(token);
      }
    });
  })(req, res, next);
};

exports.userlist = (req, res, next) => {
  passport.authenticate(
    "jwtstrategy",
    { session: false },
    (err, user, info) => {
      if (!user) {
        res.status(401).send(info);
      } else {
        console.log("in user list data");

        User.findById(ObjectID(user.id)).then(result => {
          if (result.usertype === "admin") {
            User.find()
              .then(doc => {
                doc.forEach(element => {
                  element.hash = "";
                });
                console.log(doc);
                res.status(200).json(doc);
              })
              .catch(err => {
                console.log("err" + err);
              });
          } else {
            res.status(200).send("less previladge");
          }
        });
      }
    }
  )(req, res, next);
};
