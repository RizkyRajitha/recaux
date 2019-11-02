const User = require("../db/users");
const Candidate = require("../db/candidates");
const ObjectID = require("mongodb").ObjectID;
const passport = require("passport");
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs");
const Jobspec = require("../db/jobspec");
const Interview = require("../db/interviews");
const Notifications = require("../db/nortification");
require("../config/passport");
const serverss = require("../server");
const emailhandler = require("../config/emailhandler");
const jwt = require("jsonwebtoken");

exports.configureNewUser = (req, res, next) => {
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

        var salt = bcrypt.genSaltSync(saltRounds);
        var hash = bcrypt.hashSync(datain.password, salt);

        User.findOneAndUpdate(
          { _id: ObjectID(user.id) },
          {
            $set: {
              firstName: datain.firstname,
              lastName: datain.lastname,
              hash: hash
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
    }
  )(req, res, next);
};

exports.addCandidate = (req, res, next) => {
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
          .then(userdoc => {
            const newcandidate = new Candidate({
              email: req.body.candidateemail,
              name: req.body.candidatename,
              jobspec: req.body.candidatejobspec,
              date: new Date().toISOString(),
              source: "manual",
              addedby: userdoc.firstName + " " + userdoc.lastName
            });

            newcandidate
              .save()
              .then(result => {
                var userarr = [];

                User.find({ usertype: "hr_staff" })
                  .then(docs => {
                    docs.forEach(element => {
                      userarr.push(ObjectID(element._id).toString());
                    });

                    const newnot = new Notifications({
                      dis: ` New candidate ${result.name}             `,
                      title: "New candidate",
                      time: new Date().toISOString(),
                      userIdShow: userarr,
                      candidateId: ObjectID(result._id).toString()
                    });

                    newnot
                      .save(doc => {
                        res.status(200).json(result);
                      })
                      .catch(err => console.log(err));
                  })
                  .catch(err => console.log(err));

                // serverss.wsfunc("new_interview", {
                //   candidateId: result.id,
                //   dis: "new candidate " + req.body.candidatename
                // });
              })
              .catch(err => {
                console.log(err);

                if (err.code === 11000) {
                  console.log(" reg err duplicate email found ");

                  Candidate.findOne({ email: req.body.candidateemail }).then(
                    dupcandoc => {
                      console.log("dup can id - " + dupcandoc);
                      console.log("dup can id - " + dupcandoc.id);

                      res
                        .status(403)
                        .json({ errcode: err.code, dupcanid: dupcandoc.id });
                    }
                  );
                } else {
                  res.status(403).json(err);
                }
              });
          })
          .catch(err => console.log(err));
      }
    }
  )(req, res, next);
};

exports.editCandidateDetails = (req, res, next) => {
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
        var iid = req.params.id;

        console.log(" id - " + iid);

        Candidate.findOneAndUpdate(
          { _id: ObjectID(iid) },
          { $set: { jobspec: datain.newjobspec } }
        )
          .then(doc => {
            console.log(doc);
            res.status(200).json({ msg: "edit_success" });
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  )(req, res, next);
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

          Interview.findOne({
            candidateId: iid,
            interviewtype: "firstinterview"
          })
            .then(doc1 => {
              Interview.findOne({
                candidateId: iid,
                interviewtype: "secondinterview"
              })
                .then(doc2 => {
                  Interview.findOne({
                    candidateId: iid,
                    interviewtype: "clientinterview"
                  })
                    .then(doc3 => {
                      console.log(doc1);
                      console.log(result);
                      var objRes = result.toObject();

                      if (doc1) {
                        objRes.interview = true;
                        objRes.interviewerName = doc1.interviwerName;
                        objRes.interviewerId = doc1.interviwerId;
                        objRes.scheduler = doc1.schedulerId;
                        objRes.schedulerName = doc1.schedulerName;
                        objRes.interviewtime = doc1.datetime;
                        objRes.panalwname = doc1.panalwname;
                        objRes.interviewtype = doc1.interviewtype;
                        objRes.statusHrinterview = doc1.statusHrinterview;
                        objRes.statusHrdate = doc1.statusHrdate;
                        objRes.statusHrsetby = doc1.statusHrsetby;
                      } else {
                        objRes.interview = false;
                      }

                      if (doc2) {
                        objRes.interview2 = true;
                        objRes.interviewerName2 = doc2.interviwerName;
                        objRes.interviewerId2 = doc2.interviwerId;
                        objRes.scheduler2 = doc2.schedulerId;
                        objRes.schedulerName2 = doc2.schedulerName;
                        objRes.interviewtime2 = doc2.datetime;
                        objRes.panalwname2 = doc2.panalwname;
                        objRes.interviewtype2 = doc2.interviewtype;
                        objRes.statusHrinterview2 = doc2.statusHrinterview;
                        objRes.statusHrdate2 = doc2.statusHrdate;
                        objRes.statusHrsetby2 = doc2.statusHrsetby;
                      } else {
                        objRes.interview2 = false;
                      }

                      if (doc3) {
                        objRes.interview3 = true;
                        objRes.interviewerName3 = doc3.interviwerName;
                        objRes.interviewerId3 = doc3.interviwerId;
                        objRes.scheduler3 = doc3.schedulerId;
                        objRes.schedulerName3 = doc3.schedulerName;
                        objRes.interviewtime3 = doc3.datetime;
                        objRes.panalwname3 = doc3.panalwname;
                        objRes.interviewtype3 = doc3.interviewtype;
                        objRes.statusHrinterview3 = doc3.statusHrinterview;
                        objRes.statusHrdate3 = doc3.statusHrdate;
                        objRes.statusHrsetby3 = doc3.statusHrsetby;
                      } else {
                        objRes.interview3 = false;
                      }

                      const payload = {
                        userData: userDataArr,
                        candidateData: objRes
                      };

                      console.log("\n\n");

                      //console.log(result);

                      res.status(200).json(payload);
                    })
                    .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
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

  var newcandicates = [];
  var shortlistedcandicates = [];
  var scheduledcandicates = [];

  Candidate.find()
    .then(result => {
      result.forEach(element => {
        if (element.primaryStatus === "New") {
          newcandicates.push(element);
        } else {
          if (element.interviewscheduled) {
            scheduledcandicates.push(element);
          } else {
            shortlistedcandicates.push(element);
          }
        }
      });
      console.log("---------new-----------------------");
      console.log(newcandicates);
      console.log("---------scheduled-----------------------");
      console.log(scheduledcandicates);
      console.log("---------shortliste-----------------------");
      console.log(shortlistedcandicates);

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
            candidateData: result.reverse(),
            scheduledcandicates: scheduledcandicates.reverse(),
            shortlistedcandicates: shortlistedcandicates.reverse(),
            newcandicates: newcandicates.reverse()
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
  passresetjwt = req.body.token;

  try {
    var decode = jwt.verify(passresetjwt, "authdemo");
    console.log("decode jwt - " + JSON.stringify(decode));

    User.findById({ _id: ObjectID(id) })
      .then(result => {
        if (result.hash === decode.prehash) {
          console.log("hash verified");
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
        } else {
          res.send("tokendisbled");
        }
      })
      .catch(err => {
        console.log(err);
        res.send("error");
      });
  } catch (error) {
    console.log(error);
  }

  console.log(id);
  console.log(newpassword);
  // res.send("hahahaha  " + id);
};

exports.changePass = (req, res) => {
  id = req.params.id;
  newpassword = req.body.password;

  oldpassword = req.body.oldpassword;

  User.findById({ _id: ObjectID(id) })
    .then(result => {
      console.log("found " + result.email);

      if (bcrypt.compareSync(oldpassword, result.hash)) {
        console.log("password correct");

        var salt = bcrypt.genSaltSync(saltRounds);
        var hash = bcrypt.hashSync(newpassword, salt);

        result.hash = hash;
        //result.hash = newpassword;
        result
          .save()
          .then(doc => {
            console.log("password changed succesfully");
            res.json({ msg: "passchanged" });
          })
          .catch(err => {
            console.log(err);
            res.status(500).send(err);
          });
      } else {
        console.log("old pass incorrect");
        res.json({ msg: "oldpassserror" });
      }
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
        emailhandler.mailhandlerpasswordreset(
          result[0].firstName + " " + result[0].lastName,
          email,
          result[0]._id,
          result[0].hash
        );
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
      emailhandler.mailhandleremailconfirm(
        doc.firstName + " " + doc.lastName,
        doc.email,
        doc._id
      );
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
            usertype: result.usertype,
            state: !result.state
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

//updatesecondstatus

exports.updatesecondstatus = (req, res, next) => {
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
        console.log("inna " + req.params.id);

        var iid = req.params.id;
        console.log(req.body);
        var datain = req.body;

        User.findById(ObjectID(user.id))
          .then(userdoc => {
            Interview.findOneAndUpdate(
              { candidateId: iid, interviewtype: datain.interviewtype },
              {
                $set: {
                  statusHrinterview: datain.status,
                  statusHrdate: new Date().toISOString(),
                  statusHrsetby: userdoc.firstName + " " + userdoc.lastName
                }
              }
            )
              .then(doc => {
                console.log(doc);
                res.status(200).json({ msg: "sucsess" });
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => console.log(err));
      }
    }
  )(req, res, next);
};

exports.getskilllist = (req, res, next) => {
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
        // console.log(req.body);
        // var datain = req.body;

        var pt = path.join(__dirname, "../", "config", "skills.json");
        console.log(pt);

        try {
          var ori = fs.readFileSync(pt, "utf8");

          jsonobj = JSON.parse(ori);
          //jsonobj.rolo = "aaaaa";
          //var obj = { yolo: 55 };

          //fs.writeFileSync(pt, JSON.stringify(jsonobj));

          res.status(200).json(jsonobj);
        } catch (error) {
          console.log(error);
        }
      }
    }
  )(req, res, next);
};

exports.addskill = (req, res, next) => {
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
        console.log("id - " + req.params.id);
        var iid = req.params.id;

        Candidate.updateOne(
          { _id: iid },
          {
            $addToSet: {
              skills: datain
            }
          }
        )
          .then(doc => {
            console.log(doc);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  )(req, res, next);
};

exports.removeskill = (req, res, next) => {
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
        console.log("id - " + req.params.id);
        var iid = req.params.id;

        Candidate.updateOne(
          { _id: iid },
          { $pull: { skills: { label: datain.label } } }
        )
          .then(doc => {
            console.log(doc);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  )(req, res, next);
};

exports.addnewskill = (req, res, next) => {
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
          .then(data => {
            console.log(req.body);
            var datain = req.body;

            var pt = path.join(__dirname, "../", "config", "skills.json");
            console.log(pt);

            try {
              var ori = fs.readFileSync(pt, "utf8");

              jsonobj = JSON.parse(ori);
              console.log(jsonobj.skills.length);
              var skilllength = jsonobj.skills.length;
              jsonobj.skills.push({
                value: skilllength,
                label: datain.skill
              });
              //var obj = { yolo: 55 };

              fs.writeFileSync(pt, JSON.stringify(jsonobj));

              res.status(200).json(jsonobj);
            } catch (error) {
              console.log(error);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  )(req, res, next);
};

exports.deletenewskill = (req, res, next) => {
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
          .then(data => {
            console.log(req.body);
            var datain = req.body;

            var pt = path.join(__dirname, "../", "config", "skills.json");
            console.log(pt);
            console.log("yoloylylylylylyylylyylylylyl");
            try {
              var ori = fs.readFileSync(pt, "utf8");

              jsonobj = JSON.parse(ori);
              //console.log(ori);

              for (let index = 0; index < jsonobj.skills.length; index++) {
                const element = jsonobj.skills[index];
                console.log(element.label);
                if (element.label === datain.label) {
                  console.log("found " + index);
                  jsonobj.skills.splice(index, 1);
                  break;
                }
              }

              // console.log(jsonobj.skills.length);
              // var skilllength = jsonobj.skills.length;
              // jsonobj.skills.push({
              //   value: skilllength,
              //   label: datain.skill
              // });
              //var obj = { yolo: 55 };

              fs.writeFileSync(pt, JSON.stringify(jsonobj));

              res.status(200).json(jsonobj);
            } catch (error) {
              console.log(error);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  )(req, res, next);
};

exports.getjobspeclist = (req, res, next) => {
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
        // console.log(req.body);
        // var datain = req.body;

        var payload = [];

        Jobspec.find()
          .then(doc => {
            doc.forEach(item => {
              try {
                console.log(item.label);
                payload.push({ value: item.value, label: item.label });
              } catch (error) {
                console.log(error);
              }
            });

            res.json({ jobspeclist: payload });
          })
          .catch(err => {});
      }
    }
  )(req, res, next);
};

exports.addnewjobspec = (req, res, next) => {
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
          .then(data => {
            console.log(req.body);
            var datain = req.body;
            var payload = [];
            Jobspec.find()
              .then(doc => {
                doc.forEach(item => {
                  console.log(item.label);
                  payload.push({ value: item.value, label: item.label });
                });

                console.log(doc.length);

                const newjobspec = new Jobspec({
                  label: datain.jobspec,
                  value: doc.length
                });

                newjobspec
                  .save()
                  .then(doc1 => {
                    console.log(doc1);
                    payload.push({ value: doc1.value, label: doc1.label });
                    res.status(200).json({ jobs: payload });
                  })
                  .catch(err => {
                    console.log(err);
                  });
              })
              .catch(err => console.log(err));
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  )(req, res, next);
};

exports.deletenewjobspec = (req, res, next) => {
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
          .then(data => {
            if (data.usertype == "admin" || data.usertype == "hr_staff") {
              console.log(req.body);
              var datain = req.body;

              Jobspec.findOneAndDelete({ label: datain.label }).then(docc => {
                console.log(docc);
                var payload = [];
                Jobspec.find().then(doc => {
                  doc.forEach(item => {
                    console.log(item.label);
                    payload.push({ value: item.value, label: item.label });
                  });

                  res.status(200).json({ jobs: payload });
                });
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  )(req, res, next);
};

exports.searchmany = (req, res, next) => {
  // passport.authenticate(
  //   "jwtstrategy",
  //   { session: false },
  //   (err, user, info) => {
  //     console.log("error - " + err);
  //     console.log("user - " + JSON.stringify(user));
  //     console.log("info -- " + info);

  //     if (!user) {
  //       res.status(401).send(info);
  //     } else {
  console.log(req.body);
  var datain = req.body;

  var isname = false;
  var isemail = false;
  var isjobspec = false;
  var isDate = false;
  var isStatus = false;
  var isSource = false;
  var isprimaryStatus = false;
  /**
allocated date recieved date shortlisted date added by
*/

  req.body.name ? (isname = true) : "";
  req.body.email ? (isemail = true) : "";
  req.body.jobspec ? (isjobspec = true) : "";
  req.body.source ? (isSource = true) : "";
  req.body.reciveddate ? (isRecivedDate = true) : (isRecivedDate = false);
  req.body.primarystatus ? (isprimaryStatus = true) : (isprimaryStatus = false);

  var searchQuery = {};

  if (isname) {
    console.log("nama tyei");
    var regexname = { $regex: req.body.name, $options: "i" };

    searchQuery.name = regexname;
  }

  if (isemail) {
    console.log("email tyei");

    var regexemail = { $regex: req.body.email, $options: "i" };

    searchQuery.email = regexemail;
  }

  if (isSource) {
    console.log("email tyei");

    //var regexemail = { $regex: req.body.source, $options: "i" };

    searchQuery.source = req.body.source;
  }

  if (isjobspec) {
    console.log("jobspec tyei");

    //var regexemail = { $regex: req.body.source, $options: "i" };

    searchQuery.jobspec = req.body.jobspec;
  }

  if (isRecivedDate) {
    console.log("recievd date  tyei");

    //var regexemail = { $regex: req.body.source, $options: "i" };

    // searchQuery.date = req.body.reciveddate;
    searchQuery.date = {
      $gt: req.body.reciveddate.slice(0, 10) + "T00:00:00.000Z",
      $lt: req.body.reciveddate.slice(0, 10) + "T23:59:59.000Z"
    };
  }

  if (isprimaryStatus) {
    console.log(" primary status  tyei");

    //var regexemail = { $regex: req.body.source, $options: "i" };

    // searchQuery.date = req.body.reciveddate;
    searchQuery.primaryStatus = req.body.primarystatus;
  }

  Candidate.find(searchQuery).then(doc => {
    console.log(doc);
    res.json(doc);
  });

  // )(req, res, next);
};
//addinterview

exports.addinterview = (req, res, next) => {
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
        console.log("addinterviewssssssssssssssssssssssssssssss");
        console.log(req.body);
        var datain = req.body;

        User.findById(ObjectID(datain.scheduler))
          .then(doc1 => {
            User.findById(ObjectID(datain.interviewer))
              .then(doc2 => {
                Candidate.findById(ObjectID(datain.candidateid))
                  .then(doc3 => {
                    var newinterview = new Interview({
                      schedulerId: datain.scheduler,
                      schedulerName: doc1.firstName + " " + doc1.lastName,
                      interviwerId: datain.interviewer,
                      interviwerName: doc2.firstName + " " + doc2.lastName,
                      candidateId: datain.candidateid,
                      candidateName: doc3.name,
                      datetime: datain.datetime,
                      interviewtype: datain.interviewtype,
                      panal: datain.panal,
                      panalwname: datain.panalwname
                    });

                    newinterview
                      .save()
                      .then(doc => {
                        var eventtime = new Date(
                          datain.datetime
                        ).toLocaleString("en-US", {
                          timeZone: "Asia/Colombo"
                        });

                        console.log(doc);
                        const newnot = new Notifications({
                          dis: `New interview with ${
                            doc3.name
                          } on ${eventtime} scheduled by ${doc1.firstName +
                            " " +
                            doc1.lastName}`,
                          title: "Interview",
                          time: new Date().toISOString(),
                          userIdShow: datain.panal,
                          candidateId: datain.candidateid
                        });

                        newnot
                          .save()
                          .then(docs => {
                            Candidate.findByIdAndUpdate(
                              ObjectID(datain.candidateid),
                              {
                                $set: {
                                  interviewscheduled: true
                                }
                              }
                            )
                              .then(doc => {})
                              .catch(err => {});
                            //candidatename , hrname , canemail,date , time
                            emailhandler.mailhandlerinterviewconfirmation(
                              doc3.name,
                              doc1.firstName + " " + doc1.lastName,
                              doc3.email,
                              datain.datetime
                            );

                            var objdocs = docs.toObject();
                            objdocs.candidateId = datain.candidateid;
                            serverss.wsfunc("new_interview", docs);
                            res.status(200).json({ msg: "sucsess" });
                          })
                          .catch(err => {
                            console.log(err);
                          });
                      })
                      .catch(err => console.log(err));
                  })
                  .catch(err => console.log(err));
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      }
    }
  )(req, res, next);
};

exports.updateinterview = (req, res, next) => {
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

        User.findById(ObjectID(datain.scheduler))
          .then(doc1 => {
            User.findById(ObjectID(datain.interviewer))
              .then(doc2 => {
                Candidate.findById(ObjectID(datain.candidateid))
                  .then(doc3 => {
                    Interview.findOneAndUpdate(
                      {
                        candidateId: datain.candidateid,
                        interviewtype: datain.interviewtype
                      },
                      {
                        $set: {
                          schedulerId: datain.scheduler,
                          schedulerName: doc1.firstName + " " + doc1.lastName,
                          interviwerId: datain.interviewer,
                          interviwerName: doc2.firstName + " " + doc2.lastName,

                          datetime: datain.datetime,
                          panal: datain.panal,
                          panalwname: datain.panalwname
                        }
                      }
                    )
                      .then(doc => {
                        var eventtime = new Date(
                          datain.datetime
                        ).toLocaleString("en-US", {
                          timeZone: "Asia/Colombo"
                        });

                        const newnot = new Notifications({
                          dis: `New interview with ${
                            doc3.name
                          } on ${eventtime} scheduled by ${doc1.firstName +
                            " " +
                            doc1.lastName} `,
                          title: "Interview update",
                          time: new Date().toISOString(),
                          userIdShow: datain.panal,
                          candidateId: datain.candidateid
                        });

                        newnot
                          .save()
                          .then(doss => {
                            Candidate.findOneAndUpdate(
                              { _id: ObjectID(datain.candidateid) },
                              {
                                $set: {
                                  statusHr: "Pending"
                                }
                              }
                            )
                              .then(dosss => {
                                console.log(dosss);
                              })
                              .catch(err => console.log(err));
                          })
                          .catch(err => console.log(err));

                        console.log(doc);
                        res.status(200).json({ msg: "sucsess" });
                      })
                      .catch(err => console.log(err));
                  })
                  .catch(err => console.log(err));
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      }
    }
  )(req, res, next);
};

exports.notifications = (req, res, next) => {
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

        Notifications.find({ userIdShow: { $in: [user.id] }, viwed: false })
          .then(docs => {
            console.log("nortifications");
            console.log(docs);

            if (docs === null) {
              res.status(200).json([]);
            } else {
              res.status(200).json(docs);
            }
          })
          .catch(err => console.log(err));
      }
    }
  )(req, res, next);
};

exports.notificationseen = (req, res, next) => {
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
        // { $pull: { skills: { label: datain.label } } }
        Notifications.findOneAndUpdate(
          { _id: datain.nortid },
          { $pull: { userIdShow: user.id } }
        )
          .then(docs => {
            console.log("nortifications");
            console.log(docs);

            if (docs === null) {
              res.status(200).json([]);
            } else {
              res.status(200).json(docs);
            }
          })
          .catch(err => console.log(err));
      }
    }
  )(req, res, next);
};

exports.userdataarr = (req, res, next) => {
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

        User.find({ $or: [{ usertype: "admin" }, { usertype: "depthead" }] })
          .then(doc => {
            const userDataArr = doc.map(ele => {
              return {
                label: `${ele.firstName + " " + ele.lastName}`,
                value: ele.id
              };
            });

            res.status(200).json(userDataArr);
          })
          .catch(err => console.log(err));
      }
    }
  )(req, res, next);
};

exports.reportsjobspec = (req, res, next) => {
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

        var payload = [];

        Candidate.find()
          .then(docs => {
            Jobspec.find()
              .then(joblist => {
                var jobsmat = [];

                joblist.forEach(element => {
                  docs.forEach(elementcan => {
                    if (elementcan.jobspec === element.label) {
                      jobsmat.push(element.label);
                    }
                  });
                });

                var counts = {};
                jobsmat.forEach(function(x) {
                  counts[x] = (counts[x] || 0) + 1;
                });

                for (var key in counts) {
                  if (counts.hasOwnProperty(key)) {
                    payload.push({ name: key, value: counts[key] });

                    console.log(key, counts[key]);
                  }
                }

                res.json(payload);
                console.log(payload);
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      }
    }
  )(req, res, next);
};

exports.landingpage = (req, res, next) => {
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

        var lday = datain.today.slice(0, 10) + "T00:00:00.000Z";
        var uday = datain.today.slice(0, 10) + "T23:59:59.000Z";

        Interview.find({
          panal: { $in: [user.id] },
          datetime: {
            $gte: lday,
            $lt: uday
          }
        })
          .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  )(req, res, next);
};

exports.reportsstatus = (req, res, next) => {
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
        Candidate.find({ primaryStatus: "shortlisted" })
          .then(doc1 => {
            Candidate.find({ primaryStatus: "rejected" })
              .then(doc2 => {
                Candidate.find({ primaryStatus: "onhold" })
                  .then(doc3 => {
                    Candidate.find({ primaryStatus: "New" })
                      .then(doc4 => {
                        res
                          .status(200)
                          .json({
                            shortlisted: doc1.length,
                            rejected: doc2.length,
                            onhold: doc3.length,
                            unset: doc4.length
                          });
                      })
                      .catch(err => {
                        console.log(err);
                      });
                  })
                  .catch(err => {
                    console.log(err);
                  });
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  )(req, res, next);
};

//reportscansource

exports.reportscansource = (req, res, next) => {
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

        Candidate.find({ source: "email" })
          .then(doc1 => {
            Candidate.find({ source: "manual" })
              .then(doc2 => {
                res
                  .status(200)
                  .json({ email: doc1.length, manual: doc2.length });
              })
              .catch(err => {
                console.log(err);
              });
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
