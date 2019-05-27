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
      if (!user) {
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
              pendingCandidatearr.push(element.candidateId);
            });

            console.log(pendingCandidatearr);

            Candidate.find({ _id: { $in: pendingCandidatearr } })
              .then(candocs => {
                console.log(candocs);

                for (var i = 0; i < pendingCandidatearr.length; i++) {
                  var objDoc = userdoc.shortlist[i].toObject();

                  objDoc.candidateName = candocs[i].name;
                  objDoc.candidateJobspec = candocs[i].jobspec;
                  // var temp_payload = { data:userdoc.shortlist[i]}

                    
                  console.log("temp payload - " + JSON.stringify(objDoc));
                }

                console.log("paylood - " + payload);
                res.json(payload);
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

exports.updateStatus = (req, res) => {
  console.log(req.params.id);
  var id = req.params.id;
  console.log(req.body.status);
  Candidate.findByIdAndUpdate(
    ObjectID(id),
    { $set: { status: req.body.status } },
    { new: true }
  )
    .then(doc => {
      console.log("doc");
      console.log(doc);
      res.json(doc);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
}


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
}