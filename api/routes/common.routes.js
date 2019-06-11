const User = require("../db/users");
const Candidate = require("../db/candidates");
const ObjectID = require("mongodb").ObjectID;
const passport = require("passport");
const bcrypt = require("bcryptjs");
require("../config/passport");
const emailhandler = require("../config/emailhandler");

exports.addCandidate = (req, res) => {
  console.log(req.body);

  const newcandidate = new Candidate({
    email: req.body.candidateemail,
    name: req.body.candidatename,
    jobspec: req.body.candidatejobspec,
    date: new Date().toISOString(),
    source: "manual"
  });

  newcandidate
    .save()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);

      if (err.code === 11000) {
        console.log(" reg err duplicate email found ");

        Candidate.findOne({ email: req.body.candidateemail }).then(
          dupcandoc => {
            console.log("dup can id - " + dupcandoc);
            console.log("dup can id - " + dupcandoc.id);

            res.status(403).json({ errcode: err.code, dupcanid: dupcandoc.id });
          }
        );
      } else {
        res.status(403).json(err);
      }
    });
};

exports.getOneCandidate = (req, res) => {
  console.log("hiiii");
  var iid = req.params.id;
  console.log(iid);

  console.log("req body - " + JSON.stringify(req.body));

  Candidate.findById(ObjectID(iid))
    .then(result => {
      User.find({ $or: [{ usertype: "admin" }, { usertype: "depthead" }] })
        .then(doc => {
          const userDataArr = doc.map(ele => {
            return {
              label: `${ele.firstName + " " + ele.lastName}`,
              value: ele.id
            };
          });

          console.log(userDataArr);

          const payload = {
            userData: userDataArr,
            candidateData: result
          };

          console.log("\n\n");

          console.log(result);

          res.status(200).json(payload);
        })
        .catch(err => {
          res.status(500).json(err);
        });

      // res.status(200).json(result);
      // console.log("candidates found"+userDataArr);
    })
    .catch(err => {
      console.log("error - " + err);

      res.status(500).json(err);
    });
};

exports.getAllCandidates = (req, res) => {
  console.log("hiiii");
  // var iid = req.params.id;
  //console.log(iid);

  Candidate.find()
    .then(result => {
      User.find({ $or: [{ usertype: "admin" }, { usertype: "depthead" }] })
        .then(doc => {
          const userDataArr = doc.map(ele => {
            return {
              label: `${ele.firstName + " " + ele.lastName}`,
              value: ele.id
            };
          });

          console.log(userDataArr);

          const payload = {
            userData: userDataArr,
            candidateData: result.reverse()
          };

          console.log("candidates found");
          res.status(200).json(payload);
        })
        .catch(err => {
          res.status(500).json(err);
        });
    })
    .catch(err => {
      console.log("error - " + err);
    });

  // User.findById(ObjectID(iid))
  //   .then(result => {
  //     console.log("found" + result);
  //     res.json(result);
  //   })
  //   .catch(err => {
  //     console.log("err - " + err);
  //   });
};

exports.resetpassword = (req, res) => {
  id = req.params.id;
  newpassword = req.body.password;
  console.log(id);
  console.log(newpassword);
  // res.send("hahahaha  " + id);
  User.findById({ _id: ObjectID(id) })
    .then(result => {
      console.log("found " + result.email);

      var salt = bcrypt.genSaltSync(saltRounds);
      var hash = bcrypt.hashSync(newpassword, salt);

      result.hash = hash;
      result
        .save()
        .then(doc => {
          console.log("password changed succesfully");
          res.send("password changed succesfully");
        })
        .catch(err => {
          console.log(err);
          res.status(500).send(err);
        });
    })
    .catch(err => {
      console.log(err);
      res.send("error");
    });
};

exports.changePass = (req, res) => {
  id = req.params.id;
  newpassword = req.body.password;
  console.log(id);
  console.log("pppppppppppppppppppppppppp");
  console.log(newpassword);
  console.log("pppppppppppppppppppppppppp");

  User.findById({ _id: ObjectID(id) })
    .then(result => {
      console.log("found " + result.email);

      result.hash = newpassword;
      result
        .save()
        .then(doc => {
          console.log("password changed succesfully");
          res.send("password changed succesfully");
        })
        .catch(err => {
          console.log(err);
          res.status(500).send(err);
        });
    })
    .catch(err => {
      console.log(err);
      res.send("error");
    });
};

exports.forgotPassword = (req, res) => {
  var email = req.body.email;

  User.find({ email: email })
    .then(result => {
      if (!result) {
        console.log(result + "not found error");
        res.send("no user found");
      } else {
        emailhandler.mailhandlerpasswordreset(result[0].firstName+" "+result[0].lastName,email, result[0]._id);
        console.log(result[0]._id);
        res.json(result);
      }
    })
    .catch(err => {
      console.log("error - - - " + err);
      res.send("no_user_found");
    });
};

exports.confirmEmail = (req, res) => {
  console.log(req.params.id);

  User.findOneAndUpdate(
    { _id: ObjectID(req.params.id) },
    { $set: { emailverified: true } }
  )
    .then(doc => {
      console.log("verified + " + doc.emailverified);
      res.send("email verified");
    })
    .catch(err => {
      console.log("error confirming email");
    });
};

exports.sendConfirmEmail = (req, res) => {
  console.log(req.params.id);

  User.findById(ObjectID(req.params.id))
    .then(doc => {
      console.log("tryna sent");
      emailhandler.mailhandleremailconfirm( doc.firstName+" "+doc.lastName, doc.email, doc._id);
      res.status(200).send("email sent");
    })
    .catch(err => {
      res.json(err);
    });
};

exports.editUserDetails = (req, res, next) => {
  passport.authenticate(
    "jwtstrategy",
    { session: false },
    (err, user, info) => {
      console.log("error - " + err);
      console.log("user - " + user);
      console.log("info -- " + info);

      console.log("user authenticated.....");
      var iid = req.params.id;

      console.log(iid);
      console.log("***********************");
      console.log(req.body);

      User.findOneAndUpdate(
        { _id: ObjectID(iid) },
        {
          $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
          }
        }
      )
        .then(result => {
          console.log("edit - " + result);
          res.json(result);
        })
        .catch(err => {
          console.log(err);
          res.json(err);
        });
    }
  )(req, res, next);
};

exports.userProfile = (req, res, next) => {
  passport.authenticate(
    "jwtstrategy",
    { session: false },
    (err, user, info) => {
      console.log("error - " + err);
      console.log("user - " + user);
      console.log("info -- " + info);

      console.log("user authenticated.....");
      var iid = req.params.id;
      console.log(iid);

      User.findById(ObjectID(iid))
        .then(result => {
          const senddata = {
            id: result._id,
            email: result.email,
            emailverified: result.emailverified,
            firstName: result.firstName,
            lastName: result.lastName,
            avatarUrl: result.avatarUrl,
            usertype: result.usertype
          };

          console.log("found" + result);
          res.json(senddata);
        })
        .catch(err => {
          console.log("err - " + err);
        });
    }
  )(req, res, next);
};

exports.dashboard = (req, res, next) => {
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
        User.findById(ObjectID(user.id))
          .then(result => {
            const senddata = {
              id: result._id,
              email: result.email,
              emailverified: result.emailverified,
              firstName: result.firstName,
              lastName: result.lastName,
              usertype: result.usertype,
              avatarUrl: result.avatarUrl
            };
            console.log(senddata);
            res.status(200).json(senddata);
          })
          .catch(err => {
            console.log(err);
            res.status(403).json(err);
          });
      }
    }
  )(req, res, next);
};
//items.find({
//   created_at: {
// $gte: ISODate("2010-04-29T00:00:00.000Z"),
// $lt: ISODate("2010-05-01T00:00:00.000Z")
// }
// })

exports.searchByDate = (req, res, next) => {
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

        // if(datain.from===datain.to){
        //   console.log("same")
        //   datain.from = datain.from.slice(0,10)
        //   datain.to = datain.to.slice(0,10)+"T23:59:59.000Z"

        //   console.log("new data - "+JSON.stringify(datain))
        // }

        datain.from = datain.from.slice(0, 10);
        datain.to = datain.to.slice(0, 10) + "T23:59:59.000Z";

        Candidate.find({
          date: {
            $gte: new Date(datain.from).toISOString(),
            $lt: new Date(datain.to).toISOString()
          }
        })
          .then(doc => {
            res.status(200).json(doc);
            console.log("docs - " + JSON.stringify(doc));
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
      }
    }
  )(req, res, next);
};

exports.searchByName = (req, res, next) => {
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

        Candidate.find({ name: { $regex: datain.name, $options: "i" } })
          .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
          })
          .catch(err => {});

        //find({name:{'$regex' : 'string', '$options' : 'i'}})
      }
    }
  )(req, res, next);
};

exports.getbasicuserdetails = (req, res, next) => {
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
          .then(doc => {
            var payload = {
              id: doc._id,
              firstName: doc.firstName,
              lastName: doc.lastName,
              usertype: doc.usertype,
              avatarUrl: doc.avatarUrl
            };
            res.status(200).json(payload);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  )(req, res, next);
};

exports.anythingpassportexample = (req, res, next) => {
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
