const passport = require("passport");
const User = require("../db/users");
const ObjectID = require("mongodb").ObjectID;
const emailhandler = require("../config/emailhandler");

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
          if (result.usertype === "admin" || result.usertype === "hr_staff") {
            User.find()
              .then(doc => {
                payloadarr = [];
                doc.forEach(element => {
                  var pendingcan = 0;

                  element.shortlist.forEach(element1 => {
                    if (element1.shortlistStatus === false) {
                      pendingcan = pendingcan + 1;
                    }
                  });

                  temp = {
                    firstName: element.firstName,
                    lastName: element.lastName,
                    usertype: element.usertype,
                    candidatesAssinged: pendingcan,
                    id: element._id,
                    state: element.state,
                    avatarUrl: element.avatarUrl
                  };
                  payloadarr.push(temp);
                });

                console.log(payloadarr);
                res.status(200).json(payloadarr);
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

exports.addNewUser = (req, res, next) => {
  passport.authenticate(
    "jwtstrategy",
    { session: false },
    (err, user, info) => {
      console.log("error - " + err);
      console.log("user - " + JSON.stringify(user));
      console.log("info -- " + info);

      if (!user) {
        res.status(401).send(info);
      } else {
        console.log(req.body);
        var datain = req.body;

        User.findById(ObjectID(user.id))
          .then(result => {
            if (result.usertype === "admin" || result.usertype === "hr_staff") {
              console.log("adminss - ");

              const newuser = new User({
                email: datain.email,
                usertype: datain.usertype
              });

              newuser
                .save()
                .then(doc => {
                  console.log("saved" + doc);

                  emailhandler.mailhandlernewuseremail(
                    datain.email,
                    doc._id,
                    datain.usertype
                  );
                  res.status(200).send();
                })
                .catch(err => {
                  console.log(" reg err -  " + err);

                  if (err.code === 11000) {
                    console.log(" reg err duplicate email found ");
                    res.status(403).json(err.code);
                  } else {
                    res.status(403).json(err);
                  }
                });
            } else {
              res.status(403).json("no_previladges");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  )(req, res, next);
};

//changeuserstate

exports.changeuserstate = (req, res, next) => {
  passport.authenticate(
    "jwtstrategy",
    { session: false },
    (err, user, info) => {
      console.log("error - " + err);
      console.log("user - " + JSON.stringify(user));
      console.log("info -- " + info);

      if (!user) {
        res.status(401).send(info);
      } else {
        console.log("*********************************");
        console.log(req.body);
        console.log("*********************************");
        var datain = req.body;

        console.log(req.params.id);
        var iid = req.params.id;

        User.findById(ObjectID(user.id))
          .then(data => {
            if (data.usertype == "admin" || data.usertype == "hr_staff") {
              console.log("not depthead");

              User.findOneAndUpdate(
                { _id: iid },
                { $set: { state: datain.state } }
              )
                .then(doc => {
                  console.log(doc);
                })
                .catch(err => {
                  console.log(err);
                });
            }
          })
          .catch(err => {});
      }
    }
  )(req, res, next);
};

exports.settingsadd = (req, res, next) => {
  passport.authenticate(
    "jwtstrategy",
    { session: false },
    (err, user, info) => {
      console.log("error - " + err);
      console.log("user - " + JSON.stringify(user));
      console.log("info -- " + info);

      if (!user) {
        res.status(401).send(info);
      } else {
        console.log(req.body);
        var datain = req.body;
      }
    }
  )(req, res, next);
};
