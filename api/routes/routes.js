const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../db/users");
const Candidate = require("../db/candidates");
const ObjectID = require("mongodb").ObjectID;
require("../config/passport");
const emailhandler = require("../config/emailhandler");
const path = require("path");
const Evaluation = require("../db/evaluation");

const profileimgupload = require("./fileupload.routes");
const adminRoutes = require("./admin.routes");
const deptheadRoutes = require('./depthead.routes')
//const _ = require('')

//const mailhandleremailconfirm = require('../config/emailhandler')

// router.use(function(req, res) {
// 	res.sendFile(path.join(__dirname, '/../../client/build/index.html'));
// });

router.post("/reg", (req, res, next) => {
  passport.authenticate(
    "jwtstrategy",
    { session: false },
    (err, user, info) => {
      console.log("-----in reg ------");
      console.log('imfor - '+JSON.stringify(info));

      if(info.name=="TokenExpiredError"){
        console.log('session expired')
        res.status(403).send('session_exp')
      }

      if (user) {
        console.log(`************${req.headers.authorization}****************`);

  console.log("savin.....");
  var salt = bcrypt.genSaltSync(saltRounds);
  var hash = bcrypt.hashSync(req.body.password, salt);

        const newuser = new User({
          email: req.body.email,
          hash: hash,
          firstName: req.body.firstname,
          lastName: req.body.lastname,
          usertype: req.body.usertype
        });
        console.log(`email - ${req.body.email}  pass - ${req.body.password}`);
        //newuser.setpass(req.body.password);
        console.log(">>>>><<<<<<" + user.usertype);

        User.findById(ObjectID(user.id))
          .then(doc => {
            console.log(doc.usertype);
            if (doc.usertype === "admin") {
              newuser
                .save()
                .then(result => {
                  console.log("succsess");
                  //var token = result.generateJWT();
                  return res.status(200).send();
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
            console.log('errororr - '+err)
          });
      }
    }
  )(req, res, next);
});

router.post("/login1", function(req, res, next) {
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
        var token = user.generateJWT();
        // res.cookie("jwt", token, { httpOnly: true, secure: true });
        return res.status(200).send(token);
      }
    });
  })(req, res, next);
});

router.get("/dashboard", (req, res, next) => {
  passport.authenticate(
    "jwtstrategy",
    { session: false },
    (err, user, info) => {
      console.log("error - " + err);
      console.log("user - " + user);
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
              shortList:result.shortlist
            };
            console.log(senddata);
            res.status(200).json(senddata);
          })
          .catch(err => {
            res.status(403).json(err);
          });
      }
    }
  )(req, res, next);
});

router.get("/user/:id", (req, res, next) => {
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
            lastName: result.lastName
          };

          console.log("found" + result);
          res.json(senddata);
        })
        .catch(err => {
          console.log("err - " + err);
        });
    }
  )(req, res, next);
});

router.post("/edituser/:id", (req, res, next) => {
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
});

router.post("/sendconfirmemail/:id", (req, res) => {
  console.log(req.params.id);

  User.findById(ObjectID(req.params.id))
    .then(doc => {
      console.log("tryna sent");
      emailhandler.mailhandleremailconfirm(doc.email, doc._id);
      res.status(200).send("email sent");
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/confirmemail/:id", (req, res) => {
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
});

router.post("/fogotpassword", (req, res) => {
  var email = req.body.email;

  User.find({ email: email })
    .then(result => {
      if (!result) {
        console.log(result + "not found error");
        res.send("no user found");
      } else {
        emailhandler.mailhandlerpasswordreset(email, result[0]._id);
        console.log(result[0]._id);
        res.json(result);
      }
    })
    .catch(err => {
      console.log("error - - - " + err);
      res.send("no_user_found");
    });
});

router.post("/changepass/:id", (req, res) => {
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
});

router.post("/resetpassword/:id", (req, res) => {
  id = req.params.id;
  newpassword = req.body.password;
  console.log(id);
  console.log(newpassword);
  // res.send("hahahaha  " + id);
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
});

router.get("/getcandidate", (req, res) => {
  console.log("hiiii");
  // var iid = req.params.id;
  //console.log(iid);

  Candidate.find()
    .then(result => {
      res.status(200).json(result);
      console.log("candidates found");
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
});

router.get("/getcandidate/:id", (req, res) => {
  console.log("hiiii");
  var iid = req.params.id;
  console.log(iid);

  console.log("req body - " + JSON.stringify(req.body));

  Candidate.findById(ObjectID(iid))
    .then(result => {
      User.find({})
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
});

router.get("/test", (req, res) => {
  // var ada = new Date();
  // console.log(ada);
  // const newuser = new User({
  //   email: "admin@auxenta.com",
  //   hash: "admin"
  // });

  // newuser
  //   .save()
  //   .then(result => {
  //     res.send(result);
  //   })
  //   .catch(err => {
  //     res.json(err);
  //   });

  can = ["aa", "bb"];

  User.findOneAndUpdate(
    { _id: ObjectID("5ca98a6200d8ab4264d7dffc") },
    {
      $set: {
        assinngedCandidates: can
      }
    }
  )
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/addcandidate", (req, res) => {
  console.log(req.body);

  const newcandidate = new Candidate({
    email: req.body.candidateemail,
    name: req.body.candidatename,
    jobspec: req.body.candidatejobspec,
    date: new Date()
  });

  newcandidate
    .save()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(403).json(err);
    });
});

router.post("/updatestatus/:id", (req, res) => {
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
});

router.post("/evaluation/:id", (req, res) => {
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
});

router.post("/avatar/:id", profileimgupload.profileimgup);
router.post("/cv/:id", profileimgupload.cvupload);
router.post("/adminlogin", adminRoutes.adminLogin);
router.get("/userdata", adminRoutes.userlist);
router.get('/getshortlistdata/:id',deptheadRoutes.shortlistData)

router.post("/shortlistOne/:id", (req, res, next) => {
  passport.authenticate(
    "jwtstrategy",
    { session: false },
    (err, user, info) => {
      console.log("error - " + err);
      console.log("user - " + JSON.stringify(user));
      console.log("info -- " + info);

      console.log("data - " + JSON.stringify(req.body));

      var datain = req.body;
      console.log('shortlist one')
      //  User.updateOne({_id:datain.allocateduser},{$push:datain.candidateallocated}).then(userdoc=>{

      //   Candidate.updateOne({_id:datain.candidateallocated},{$set:{:datain.candidateallocated}}).then(candoc=>{

      User.findById(ObjectID(user.id))
        .then(allocaterdoc => {
          User.findById(ObjectID(datain.allocateduser))
            .then(userDoc => {
              Candidate.updateOne(
                { _id: datain.candidateallocated },

                {
                  $set: {
                    assignToshortlisterbyName:
                      allocaterdoc.firstName + " " + allocaterdoc.lastName,
                    assignToshortlisterbyId: user.id,
                    shortlister: datain.allocateduser,
                    shortlisterName: userDoc.firstName + " " + userDoc.lastName
                  }
                }
              ).then(candoc => {
                User.updateOne(
                  { _id: datain.allocateduser },
                  {
                    $push: {
                      shortlist: {
                        candidateId: datain.candidateallocated,
                        allocatedbyUserId: user.id,
                        allocatedDate: new Date(),
                        allocatedUserName:allocaterdoc.firstName + " " + allocaterdoc.lastName
                      }
                    }
                  }
                )
                  .then(docc => {
                    console.log("candoc - " + JSON.stringify(candoc) + "user doc -" + JSON.stringify(docc));
                    if(candoc.ok===1 && docc.ok===1){
                      res.json({msg:'allocated_success'});
                    }
                    
                  })
                  .catch(err => {
                    res.json(err);
                  });
                //ser.update(
                //     { _id: allocatedUserId },
                //     { $push: { assinngedCandidates: { $each: shortList} } }
              });
            })
            .catch(err => {});
        })
        .catch(err => {});
    }
  )(req, res, next);
});

router.post("/shortlistMany/:id", (req, res, next) => {
  passport.authenticate(
    "jwtstrategy",
    { session: false },
    (err, user, info) => {
      console.log("error - " + err);
      console.log("user - " + JSON.stringify(user));
      console.log("info -- " + info);

      console.log("user authenticated.....");
      var iid = req.params.id;

      console.log(iid);
      console.log("***********body************");
      console.log(req.body);

      var allocatedUserId = req.body.allocateduser;
      var shortList = req.body.candidatesallocated;
      var payloadarr = { senddata: [], error: [] };

      payloadarr.noFoCandidate = shortList.length;
      payloadarr.noOfSucsessalocations = 0;
      payloadarr.noOfFailedalocations = 0;

      var myPromise = () => {
        return new Promise((resolve, reject) => {
          User.findById(ObjectID(iid))
            .then(allocaterUserDoc => {
              User.findById(ObjectID(allocatedUserId))
                .then(userDoc => {
                  Candidate.updateMany(
                    {
                      _id: { $in: shortList }
                    },
                    {
                      $set: {
                        assignToshortlisterbyName:
                          allocaterUserDoc.firstName +
                          " " +
                          allocaterUserDoc.lastName,
                        assignToshortlisterbyId: iid,
                        shortlister: allocatedUserId,
                        shortlisterName:
                          userDoc.firstName + " " + userDoc.lastName
                      }
                    }
                  )
                    .then(doc => {
                      //payloadarr.senddata.push(doc)
                      console.log("doc push - "+JSON.stringify(userDoc));
                      
                      shortList.forEach(element => {
                        userDoc.shortlist.push({candidateId:element,allocatedbyUserId:iid,allocatedUserName:allocaterUserDoc.firstName+" "+allocaterUserDoc.lastName,allocatedDate:new Date})
                      });

                      userDoc.save().then(finaluserdoc=>{

                        console.log('allocate many - '+JSON.stringify({updoc:doc,finaldoc:finaluserdoc}))

                        resolve({updoc:doc,finaldoc:finaluserdoc});
                      }).catch(err=>{
                        console.log(err)
                      })

                      
                    })
                    .catch(err => {
                      payloadarr.error.push(err);
                      reject(err);
                    });
                })
                .catch(err => {});
            })
            .catch(err => {});
        });
      };

      //Step 2: async promise handler
      var callMyPromise = async () => {
        var result = await myPromise();
        //anything here is executed after result is resolved
        return result;
      };

      callMyPromise()
        .then(function(result) {
          console.log(result);
          res.json(result);
        })
        .catch(err => {
          console.log(err);
        });

      // var validation = new Promise((resolve, reject) => {
      //   var i = 0; // shortList.length

      //   Candidate.find({}).then(docs => {
      //     docs.forEach(ele1 => {
      //       shortList.forEach(ele2 => {
      //         //.log('pojfpejfpe '+ele1._id+' '+ele2)
      //         if (ele1._id == ele2) {
      //           console.log("yolo");
      //           console.log(ele1.shortlister);

      //           if (ele1.shortlister === undefined) {
      //             i = i + 1;
      //             console.log("jaya he");
      //           } else {
      //             console.log("error dup can");
      //             reject({ msg: "error dup can", id: ele2 });
      //           }
      //         }
      //       });
      //     });
      //     if (i == shortList.length) {
      //       resolve("oye" + i);
      //       console.log("booya");
      //     }
      //   });
      // });

      // var adddata = () => {
      //   shortList.forEach(element => {
      //     Candidate.findById(ObjectID(element)).then(data => {
      //       data.shortlister=allocatedUserId

      //       data.save.then(rr=>{

      //       }).catch(err=>{

      //       })
      //     });
      //   });

      //   User.update(
      //     { _id: allocatedUserId },
      //     { $push: { assinngedCandidates: { $each: shortList} } }
      //   )
      //     .then(doc => {}).catch(err=>{

      //     })

      // }

      // validation
      //   .then(ress => {
      //     //adddata()
      //     console.log("resolve" + ress);
      //     res.send('ok')
      //   })
      //   .catch(err => {
      //     console.log(err);
      //     res.send(err)
      //   });
    }
  )(req, res, next);
});

//

/**
if (uniqecan) {
            console.log("in uniqe can");
            shortList.forEach(element => {
              //console.log(element)
              await Candidate.findById(ObjectID(element))
                .then(data => {
                  if (data.shortlister === undefined) {
                    User.update(
                      { _id: allocatedUserId },
                      { $push: { assinngedCandidates: element } }
                    )
                      .then(doc => {
                        console.log("doc");
                        console.log("candidate doc");
                        console.log(doc);
                        data.shortlister = allocatedUserId;
  
                        await data
                          .save()
                          .then(candoc => {
                            payloadarr.noOfSucsessalocations =
                              payloadarr.noOfSucsessalocations + 1;
                            var payload = { candata: candoc, userdata: doc };
                            payloadarr.senddata.push(payload);
                            console.log("payload array - " + payloadarr);
  
                            //res.status(200).json(payload);
                          })
                          .catch(err => {
                            console.log(err);
                            //res.json(err);
                          });
                      })
                      .catch(err => {
                        console.log(err);
                        //res.json(err);
                      });
                  } else {
                    payloadarr.noOfFailedalocations =
                      payloadarr.noOfFailedalocations + 1;
                    payloadarr.error.push(element);
  
                    console.log(
                      "the caniddate is already alloated " + payloadarr.error
                    );
                  } 
 
 */

// router.get(
//   "/protected",
//   passport.authenticate("jwtstrategy", { session: false }),
//   (req, res) => {
//     const { user } = req;

//     res.status(200).send({ user });
//   }
// );

module.exports = router;
