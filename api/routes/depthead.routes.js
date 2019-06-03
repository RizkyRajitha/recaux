const passport = require("passport");
const User = require("../db/users");
const Candidate = require("../db/candidates");
const ObjectID = require("mongodb").ObjectID;
var fs = require("fs");

exports.shortlistData = (req, res, next) => {
  passport.authenticate(
    "jwtstrategy",
    { session: false },
    (err, user, info) => {
      if (!user && user.usertype === "hr_staff") {
        res.status(401).send(info);
      } else {
        console.log("in shortlist data");

        var userid = req.params.id;
        console.log("userid - " + userid);

        var payload = [];

        User.findById(ObjectID(userid))
          .then(userdoc => {
            console.log("short data - " + JSON.stringify(userdoc.shortlist));

            var pendingCandidatearr = [];

            userdoc.shortlist.forEach(element => {
              if (element.shortlistStatus === false) {
                pendingCandidatearr.push(element.candidateId);
              }
            });

            console.log(pendingCandidatearr);

            Candidate.find({ _id: { $in: pendingCandidatearr } })
              .then(candocs => {
                console.log(candocs);

                for (var i = 0; i < candocs.length; i++) {
                  var objDoc = userdoc.shortlist[i].toObject();

                  objDoc.candidateName = candocs[i].name;
                  objDoc.candidateJobspec = candocs[i].jobspec;
                  objDoc.candidateEmail = candocs[i].email;
                  // var temp_payload = { data:userdoc.shortlist[i]}

                  payload.push(objDoc);
                  console.log("temp payload - " + JSON.stringify(objDoc));
                }

                console.log("paylood - " + payload);
                res.json(payload.reverse());
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

exports.userlist = (req, res, next) => {
  passport.authenticate(
    "jwtstrategy",
    { session: false },
    (err, user, info) => {
      if (!user) {
        res.status(401).send(info);
      } else {
        console.log("in user list data");

        User.findById(ObjectID(user.id))
          .then(result => {
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
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  )(req, res, next);
};

exports.updateStatus = (req, res, next) => {
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
            if (result.usertype === "admin" || result.usertype === "depthead") {
              console.log(req.body);
              var datain = req.body;

              console.log(req.params.id);
              var id = req.params.id;
              console.log(req.body.status);

              Candidate.findById(ObjectID(id))
                .then(candoc => {
                  console.log(candoc.shortlister);
                  console.log("   " + result._id);
                  console.log("  555 " + result._id.equals(candoc.shortlister));

                  if (result._id.equals(candoc.shortlister)) {
                    console.log("valid user elegible for shortlisting");

                    Candidate.findByIdAndUpdate(
                      ObjectID(id),
                      {
                        $set: {
                          status: req.body.status,
                          shortlistedDate: new Date().toISOString()
                        }
                      },
                      { new: true }
                    )
                      .then(doc => {
                        User.findOneAndUpdate(
                          {
                            _id: result._id,
                            "shortlist.candidateId": id
                          },
                          {
                            $set: {
                              "shortlist.$.shortlistStatus": true,
                              "shortlist.$.shortlistedDate": new Date().toISOString()
                            }
                          },
                          { new: true }
                        )
                          .then(userdoc2 => {
                            console.log(
                              "updated dco - " + JSON.stringify(userdoc2)
                            );

                            console.log("doc");
                            console.log(doc);
                            res.status(200).json({ msg: "sucsess" });
                          })
                          .catch(err => {
                            console.log(err);
                          });
                      })
                      .catch(err => {
                        console.log(err);
                        res.json(err);
                      });
                  } else {
                    res.status(401).send("less previladge");
                  }
                })
                .catch(err => {});

              // Candidate.findByIdAndUpdate(
              //   ObjectID(id),
              //   { $set: { status: req.body.status,shortlistedDate:new Date().toISOString(), } },
              //   { new: true }
              // )
              //   .then(doc => {
              //     console.log("doc");
              //     console.log(doc);
              //     res.json(doc);
              //   })
              //   .catch(err => {
              //     console.log(err);
              //     res.json(err);
              //   });
            } else {
              res.status(401).send("less previladge");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  )(req, res, next);
};

exports.evaluation = (req, res) => {
  console.log("eval");

  console.log(req.params.id);

  console.log(req.body);

  console.log("bodtyyy " + req.body.evaluatorId);
  console.log("bodtyyy " + req.body.evaluationMarks);

  const evalation = new Evaluation({
    candidateId: req.body.candidateId,
    evaluatorId: req.body.evaluatorId,
    evaluationMarks: req.body.evaluationMarks,
    acadamicBackground: req.body.acadamicBackground,
    indusrtyExperiance: req.body.indusrtyExperiance,
    currentPosition: req.body.currentPosition,
    JobPeriod: req.body.JobPeriod
  });

  evalation
    .save()
    .then(doc => {
      console.log(doc);
      res.status(200).json(doc);
    })
    .catch(er => {
      console.log(er);
    });
};

exports.shortlistOverideOne = (req, res, next) => {
  passport.authenticate(
    "jwtstrategy",
    { session: false },
    (err, user, info) => {
      if (!user) {
        res.status(401).send(info);
      } else {
        console.log("in shortlist overide one");

        console.log(req.body);
        var datain = req.body;

        User.findById(ObjectID(user.id))
          .then(allocaterdoc => {
            User.updateOne(
              { _id: datain.newallocateduser },
              {
                $push: {
                  shortlist: {
                    candidateId: datain.candidateallocated,
                    allocatedbyUserId: user.id,
                    allocatedDate: new Date(),
                    allocatedUserName:
                      allocaterdoc.firstName + " " + allocaterdoc.lastName
                  }
                }
              }
            )
              .then(doc1 => {
                User.updateOne(
                  { _id: datain.oldAllocateuser },
                  {
                    $pull: {
                      shortlist: { candidateId: datain.candidateallocated }
                    }
                  }
                )
                  .then(doc2 => {
                    User.findById(ObjectID(datain.newallocateduser))
                      .then(newallocateduserdoc => {
                        Candidate.updateOne(
                          { _id: datain.candidateallocated },

                          {
                            $set: {
                              assignToshortlisterbyName:
                                allocaterdoc.firstName +
                                " " +
                                allocaterdoc.lastName,
                              assignToshortlisterbyId: user.id,
                              shortlister: datain.newallocateduser,
                              shortlisterName:
                                newallocateduserdoc.firstName +
                                " " +
                                newallocateduserdoc.lastName
                            }
                          }
                        )
                          .then(doc3 => {
                            console.log(
                              "overide - allocaterdoc - " +
                                JSON.stringify(newallocateduserdoc) +
                                " push -  " +
                                JSON.stringify(doc1) +
                                " pull -  " +
                                JSON.stringify(doc2) +
                                "can doc - " +
                                JSON.stringify(doc3)
                            );

                            res.json({ msg: "allocated_success" });
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
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  )(req, res, next);
};
