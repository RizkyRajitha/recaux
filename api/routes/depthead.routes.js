const passport = require("passport");
const User = require("../db/users");
const Candidate = require("../db/candidates");
const Evaluation = require("../db/evaluation");
const Interview = require("../db/interviews");
const ObjectID = require("mongodb").ObjectID;
var fs = require("fs");
const pdf = require("html-pdf");
const evaluationPdfTemplate = require("../config/evaluationPdf/template");

exports.shortlistData = (req, res, next) => {
  passport.authenticate(
    "jwtstrategy",
    { session: false },
    (err, user, info) => {
      if (!user && user.usertype === "hr_staff") {
        res.status(401).send(info);
      } else {
        console.log("in shortlist data");

        var userid = user.id;
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
                  // var objDoc = userdoc.shortlist[i].toObject();

                  var objDoc = candocs[i].toObject();

                  // objDoc.candidateName = candocs[i].name;
                  // objDoc.candidateJobspec = candocs[i].jobspec;
                  // objDoc.candidateEmail = candocs[i].email;
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

              if (req.body.status === "shortlisted") {
                Candidate.findByIdAndUpdate(
                  ObjectID(id),
                  {
                    $set: {
                      primaryStatus: "Shortlisted"
                    }
                  },
                  { new: true }
                )
                  .then(doc1 => {})
                  .catch(err => console.log(err));
              }

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

exports.evaluationAdd = (req, res, next) => {
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

        console.log("eval");

        console.log(req.params.id);

        // console.log(req.body);

        console.log("bodtyyy " + req.body.evaluatorId);
        console.log("bodtyyy " + req.body.evaluationMarks);

        const evalation = new Evaluation({
          name: req.body.name,
          candidateId: req.body.candidateId,
          role: req.body.role,
          date: req.body.date,
          interviewedByName: req.body.interviewedByName,
          interviewedById: user.id,
          academicBackground: req.body.academicBackground,
          industryExperience: req.body.industryExperience,
          currentPosition: req.body.currentPosition,
          currentEmployer: req.body.currentEmployer,
          skill1: req.body.skill1,
          skill2: req.body.skill2,
          skill3: req.body.skill3,
          skill4: req.body.skill4,
          skill5: req.body.skill5,
          skill6: req.body.skill6,
          skill7: req.body.skill7,
          skill8: req.body.skill8,
          skill9: req.body.skill9,
          skill10: req.body.skill10,
          skill11: req.body.skill11,
          skill12: req.body.skill12,
          skill13: req.body.skill13,
          skill14: req.body.skill14,
          rate1: req.body.rate1,
          rate2: req.body.rate2,
          rate3: req.body.rate3,
          rate4: req.body.rate4,
          rate5: req.body.rate5,
          rate6: req.body.rate6,
          rate7: req.body.rate7,
          rate8: req.body.rate8,
          rate9: req.body.rate9,
          rate10: req.body.rate10,
          rate11: req.body.rate11,
          rate12: req.body.rate12,
          rate13: req.body.rate13,
          rate14: req.body.rate14,
          overrallRating: req.body.overrallRating,
          summary: req.body.summary,
          salary1: req.body.salary1,
          salary2: req.body.salary2,
          salary3: req.body.salary3,
          salary4: req.body.salary4,
          period1: req.body.period1,
          period2: req.body.period2,
          approve: req.body.approve,
          approveid: req.body.approveid
        });

        evalation
          .save()
          .then(doc => {
            //console.log(doc);

            Candidate.updateOne(
              { _id: req.body.candidateId },

              {
                $set: {
                  interviewed: true
                }
              }
            )
              .then(doc => {
                console.log(doc);
              })
              .catch(err => console.log(err));

            res.status(200).json({ msg: "sucsess" });
          })
          .catch(er => {
            console.log(er);
          });
      }
    }
  )(req, res, next);
};

exports.getevalpdf = (req, res, next) => {
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
        var canid = req.params.id;
        console.log("canid - " + req.params.id);

        Evaluation.find({ candidateId: req.params.id })
          .then(doc => {
            pdf
              .create(
                evaluationPdfTemplate({
                  name: doc[0].name,
                  interviwedDate: doc[0].date,
                  Jobspec: doc[0].role,
                  academicBackground: doc[0].academicBackground,
                  industryExperience: doc[0].industryExperience,
                  currentPosition: doc[0].currentPosition,
                  currentEmployer: doc[0].currentEmployer,
                  interviwerName: doc[0].interviewedByName
                }),
                {}
              )
              .toFile(
                "../assets/evaluationforms/" +
                  req.params.id +
                  "evaluationpdf.pdf",
                function(err, pdfdata) {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log("res");
                    console.log(pdfdata);

                    // res.status(200).json({
                    //   msg: "sucsess",
                    //   url:
                    //     "http://localhost:3001/evaluation/" +
                    //     req.params.id +
                    //     "evaluationpdf.pdf"
                    // }); //"5d3de640973a806147d74de2evaluationpdf.pdf'})

                    res.download(
                      pdfdata.filename,
                      req.params.id + "evalpdf.pdf",
                      function(err) {
                        if (err) {
                          console.log(err);
                          // Handle error, but keep in mind the response may be partially-sent
                          // so check res.headersSent
                        } else {

                          // decrement a download credit, etc.
                        }
                      }
                    );
                    
                    //res.download();
                  }
                }
              );
          })
          .catch(err => console.log(err));
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

// exports.evaluationAdd = (req, res) => {
//   console.log("eval");

//   console.log(req.params.id);

//   console.log(req.body);

//   console.log("bodtyyy " + req.body.evaluatorId);
//   console.log("bodtyyy " + req.body.evaluationMarks);

//   const evalation = new Evaluation({
//     name: req.body.name,
//     candidateId: req.body.candidateId,
//     role: req.body.role,
//     date: req.body.date,
//     interviewedBy: req.body.interviewedBy,
//     interviewedById: req.body.interviewedBy,
//     academicBackground: req.body.academicBackground,
//     industryExperience: req.body.industryExperience,
//     currentPosition: req.body.currentPosition,
//     currentEmployer: req.body.currentEmployer,
//     skill1: req.body.skill1,
//     skill2: req.body.skill2,
//     skill3: req.body.skill3,
//     skill4: req.body.skill4,
//     skill5: req.body.skill5,
//     skill6: req.body.skill6,
//     skill7: req.body.skill7,
//     skill8: req.body.skill8,
//     skill9: req.body.skill9,
//     skill10: req.body.skill10,
//     skill11: req.body.skill11,
//     skill12: req.body.skill12,
//     skill13: req.body.skill13,
//     skill14: req.body.skill14,
//     rate1: req.body.rate1,
//     rate2: req.body.rate2,
//     rate3: req.body.rate3,
//     rate4: req.body.rate4,
//     rate5: req.body.rate5,
//     rate6: req.body.rate6,
//     rate7: req.body.rate7,
//     rate8: req.body.rate8,
//     rate9: req.body.rate9,
//     rate10: req.body.rate10,
//     rate11: req.body.rate11,
//     rate12: req.body.rate12,
//     rate13: req.body.rate13,
//     rate14: req.body.rate14,
//     overrallRating: req.body.overrallRating,
//     summary: req.body.summary,
//     salary1: req.body.salary1,
//     salary2: req.body.salary2,
//     salary3: req.body.salary3,
//     salary4: req.body.salary4,
//     period1: req.body.period1,
//     period2: req.body.period2,
//     approve: req.body.approve
//   });

//   evalation
//     .save()
//     .then(doc => {
//       console.log(doc);
//       res.status(200).json(doc);
//     })
//     .catch(er => {
//       console.log(er);
//     });
// };

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
              { _id: datain.oldAllocateuser },
              {
                $pull: {
                  shortlist: { candidateId: datain.candidateallocated }
                }
              }
            )
              .then(doc1 => {
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
                  .then(doc2 => {
                    User.findById(ObjectID(datain.newallocateduser))
                      .then(newallocateduserdoc => {
                        Candidate.updateOne(
                          { _id: datain.candidateallocated },

                          {
                            $set: {
                              allocatedDate: new Date().toISOString(),
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

//interviews

exports.interviews = (req, res, next) => {
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

        Interview.find({
          interviwerId: user.id
        })
          .then(doc => {
            res.status(200).json(doc);
            console.log(doc);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  )(req, res, next);
};
