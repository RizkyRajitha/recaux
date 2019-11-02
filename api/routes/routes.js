//import io from 'socket.io'
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
const fileUpload = require("./fileupload.routes");
const adminRoutes = require("./admin.routes");
const deptheadRoutes = require("./depthead.routes");
const commonRoutes = require("./common.routes");
const Jobspec = require("../db/jobspec");
const Notifications = require('../db/nortification')
const fs = require("fs");


const pdf = require('html-pdf');
const options = {format: 'Letter'};
const evaluationPdfTemplate = require('../config/evaluationPdf/template')

const serverss = require('../server')



//const skillJson = require("../config/skills.json");

//const mailhandleremailconfirm = require('../config/emailhandler')

// router.use(function(req, res) {
// 	res.sendFile(path.join(__dirname, '/../../client/build/index.html'));
// });

// router.post("/reg", (req, res, next) => {
//   passport.authenticate(
//     "jwtstrategy",
//     { session: false },
//     (err, user, info) => {
//       console.log("-----in reg ------");
//       console.log("imfor - " + JSON.stringify(info));

//       if (info.name == "TokenExpiredError") {
//         console.log("session expired");
//         res.status(403).send("session_exp");
//       }

//       if (user) {
//         console.log(`************${req.headers.authorization}****************`);

//         console.log("savin.....");
// var salt = bcrypt.genSaltSync(saltRounds);
// var hash = bcrypt.hashSync(req.body.password, salt);

//         const newuser = new User({
//           email: req.body.email,
//           hash: hash,
//           firstName: req.body.firstname,
//           lastName: req.body.lastname,
//           usertype: req.body.usertype
//         });
//         console.log(`email - ${req.body.email}  pass - ${req.body.password}`);
//         //newuser.setpass(req.body.password);
//         console.log(">>>>><<<<<<" + user.usertype);

//         User.findById(ObjectID(user.id))
//           .then(doc => {
//             console.log(doc.usertype);
//             if (doc.usertype === "admin") {
//               newuser
//                 .save()
//                 .then(result => {
//                   console.log("succsess");
//                   //var token = result.generateJWT();
//                   return res.status(200).send();
//                 })
//                 .catch(err => {
//                   console.log(" reg err -  " + err);

//                   if (err.code === 11000) {
//                     console.log(" reg err duplicate email found ");
//                     res.status(403).json(err.code);
//                   } else {
//                     res.status(403).json(err);
//                   }
//                 });
//             } else {
//               res.status(403).json("no_previladges");
//             }
//           })
//           .catch(err => {
//             console.log("errororr - " + err);
//           });
//       }
//     }
//   )(req, res, next);
// });

router.post("/login1", function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    console.log("ppppp/***************************************************");

    console.log("error - " + err);
    console.log("user - " + JSON.stringify(user));
    console.log("info -- " + info);
    console.log("ppppp/***************************************************");

    if (err) {
      console.log("error no user");
      return next(err);
    }
    if (!user) {
      console.log("error no1");
      console.log(info);
      if (info.message) {
        return res.send(info.message);
      }
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      } else {
        console.log("done");
        console.log(user);
        var token = user.generateJWT();
        var payload = {
          token: token,
          usertype: user.usertype,
          userId: user._id
        };
        // res.cookie("jwt", token, { httpOnly: true, secure: true });
        return res.status(200).send(payload);
      }
    });
  })(req, res, next);
});
router.get("/dashboard", commonRoutes.dashboard); //send basic user details for the dashboard
router.get("/user/:id", commonRoutes.userProfile); //send data to the user profile
router.post("/edituser/:id", commonRoutes.editUserDetails); //edit user data routes
router.get("/sendconfirmemail/:id", commonRoutes.sendConfirmEmail);
router.post("/confirmemail/:id", commonRoutes.confirmEmail);
router.post("/fogotpassword", commonRoutes.forgotPassword);
router.post("/changepass/:id", commonRoutes.changePass);
router.post("/resetpassword/:id", commonRoutes.resetpassword);
router.get("/getcandidate", commonRoutes.getAllCandidates);
router.get("/getcandidate/:id", commonRoutes.getOneCandidate);
router.post("/addcandidate", commonRoutes.addCandidate);
router.post("/updatestatus/:id", deptheadRoutes.updateStatus);
router.post("/updatesecondstatus/:id", commonRoutes.updatesecondstatus);
router.post("/evaluationadd/:id", deptheadRoutes.evaluationAdd);
router.post("/avatar/:id", fileUpload.profileimgup);
router.post("/cv/:id/:username/:jobspec", fileUpload.cvupload);
router.post("/adminlogin", adminRoutes.adminLogin);
router.get("/userdata", adminRoutes.userlist);
router.get("/getshortlistdata/:id", deptheadRoutes.shortlistData); //get the data of allocated candidates to  shortlister (dept head)
router.post("/searchbydate", commonRoutes.searchByDate);
router.post("/shortlistOneOveride", deptheadRoutes.shortlistOverideOne);
router.post("/searchbyname", commonRoutes.searchByName);
router.get("/basicuserdetails", commonRoutes.getbasicuserdetails);
router.post("/editcandidatedetails/:id", commonRoutes.editCandidateDetails);
router.post("/reg", adminRoutes.addNewUser);
router.post("/configurenewuser", commonRoutes.configureNewUser);
router.post("/changeuserstate/:id", adminRoutes.changeuserstate);
router.get("/skilllist", commonRoutes.getskilllist);
router.post("/addskill/:id", commonRoutes.addskill);
router.post("/removeskill/:id", commonRoutes.removeskill);
router.post("/addnewskill", commonRoutes.addnewskill);
router.post("/deletenewskill", commonRoutes.deletenewskill);
router.post("/searchmany", commonRoutes.searchmany);
router.post("/addnewjobspec", commonRoutes.addnewjobspec);
router.get("/getjobspeclist", commonRoutes.getjobspeclist);
router.post("/deletenewjobspec", commonRoutes.deletenewjobspec);
router.post("/addinterview", commonRoutes.addinterview);
router.post("/updateinterview", commonRoutes.updateinterview);
router.get('/interviews',deptheadRoutes.interviews)
router.get('/getevalpdf/:id',deptheadRoutes.getevalpdf)
router.get('/notifications',commonRoutes.notifications)
router.get('/userdataarr',commonRoutes.userdataarr)
router.post('/notificationseen',commonRoutes.notificationseen)
router.get('/reportsjobspec',commonRoutes.reportsjobspec)
router.post('/landingpage',commonRoutes.landingpage)
router.post('/updatefinalstatus',deptheadRoutes.updatefinalstatus)
router.post('/outproject/:id',deptheadRoutes.outproject)
router.get('/reportscansource',commonRoutes.reportscansource)
router.get('/reportscanstatus',commonRoutes.reportsstatus)
router.get('/log',adminRoutes.logger)
router.get("/testing", (req, res) => {

})

  //io.emit("new_candidate", result);
 
 
 
 
 
 
 
  // var newjobspec = new Jobspec({
  //   label: "buha",
  //   value: "habubu"
  // });

  // var payload = [];

  // Jobspec.find()
  //   .then(doc => {
  //     doc.forEach(item => {
  //       try {
  //         console.log(item.label);
  //         payload.push({ value: item.value, label: item.label });
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     });

  //     res.json({ jobspeclist: payload });
  //   })
  //   .catch(err => {});

  // newjobspec
  //   .save()
  //   .then(doc => {
  //     console.log(doc);
  //     res.status(200).json(doc);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     res.status(200).json(err);
  //   });

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
      console.log("shortlist one");
      //  User.updateOne({_id:datain.allocateduser},{$push:datain.candidateallocated}).then(userdoc=>{

      //   Candidate.updateOne({_id:datain.candidateallocated},{$set:{:datain.candidateallocated}}).then(candoc=>{

      User.findById(ObjectID(user.id))
        .then(allocaterdoc => {
          User.findById(ObjectID(datain.allocateduser))
            .then(userDoc => {
              Candidate.updateOne(
                { _id: datain.candidateallocated },

                {
                  $set: {allocatedtoshorltistdone:true,
                    assignToshortlisterbyName:
                      allocaterdoc.firstName + " " + allocaterdoc.lastName,
                    assignToshortlisterbyId: user.id,
                    shortlister: datain.allocateduser,
                    shortlisterName: userDoc.firstName + " " + userDoc.lastName,
                    allocatedDate: new Date().toISOString(),
                    allocatedtoshorltistdone:true
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
                        allocatedUserName:
                          allocaterdoc.firstName + " " + allocaterdoc.lastName
                      }
                    }
                  }
                )
                  .then(docc => {
                    console.log(
                      "candoc - " +
                        JSON.stringify(candoc) +
                        "user doc -" +
                        JSON.stringify(docc)
                    );

                    if (candoc.ok === 1 && docc.ok === 1) {
                     

Candidate.findById(ObjectID(datain.candidateallocated)).then(candidatedocs=>{


 const newnot = new Notifications({
            dis: ` new shortlist  candidate ${candidatedocs.name} `,
            title: "New Shortlist",
            time: new Date().toISOString(),
            userIdShow:  [datain.allocateduser] ,
            candidateId: ObjectID(candidatedocs._id).toString()
          });

          newnot
            .save(doc => {
               res.json({ msg: "allocated_success" });
              //res.status(200).json(result);
            })
            .catch(err => console.log(err));

}).catch(err=>{
  console.log(err)
})




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

      //payloadarr.noFoCandidate = shortList.length;
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
                        allocatedtoshorltistdone:true,
                        assignToshortlisterbyName:
                          allocaterUserDoc.firstName +
                          " " +
                          allocaterUserDoc.lastName,
                        assignToshortlisterbyId: iid,
                        shortlister: allocatedUserId,
                        shortlisterName:
                          userDoc.firstName + " " + userDoc.lastName,

                        allocatedDate: new Date().toISOString()
                      }
                    }
                  )
                    .then(doc => {
                      //payloadarr.senddata.push(doc)
                      console.log("doc push - " + JSON.stringify(userDoc));

                      shortList.forEach(element => {
                        userDoc.shortlist.push({
                          candidateId: element,
                          allocatedbyUserId: iid,
                          allocatedUserName:
                            allocaterUserDoc.firstName +
                            " " +
                            allocaterUserDoc.lastName,
                          allocatedDate: new Date().toISOString()
                        });


Candidate.findById(ObjectID(element)).then(candidatedocs=>{


 const newnot = new Notifications({
            dis: ` new shortlist  candidate ${candidatedocs.name} `,
            title: "New Shortlist",
            time: new Date().toISOString(),
            userIdShow:  [allocatedUserId] ,
            candidateId: ObjectID(candidatedocs._id).toString()
          });

          newnot
            .save(doc => {
             // res.status(200).json(result);
            })
            .catch(err => console.log(err));

}).catch(err=>{
  console.log(err)
})



                      });

                      userDoc
                        .save()
                        .then(finaluserdoc => {
                          console.log(
                            "allocate many - " +
                              JSON.stringify({
                                updoc: doc,
                                finaldoc: finaluserdoc
                              })
                          );

                          resolve({ updoc: doc, finaldoc: finaluserdoc });
                        })
                        .catch(err => {
                          console.log(err);
                        });
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

// router.post("/add",(req,res){
//   let evaluation=new Evaluation(req.body);
//   evaluation.save()
//   .then(evaluation =>{
//     res.status(200).json({evaluation:"Evaluationb form added"});

//   })
//   .catch(err =>{
//     res.status(400).send("adding new evaluation form failed");
//   });
// });



router.get("/testws", (req, res) => {

  serverss.wsfunc( 'new_interview',[{msg:"new interview"}])
  res.send('bla bla')

})

router.get("/test", (req, res) => {
  var ada = new Date();
  console.log(ada);

  Candidate.find({
    date: {
      $gte: new Date("2019-05-20T00:00:00.000Z").toISOString(),
      $lt: new Date("2019-06-01T00:00:00.000Z").toISOString()
    }
  }).then(doc => {
    console.log("docs - " + JSON.stringify(doc));
  });

  res.status(200).json({ hola: "hawa" });
});


router.get("/analytics", (req, res) => {
  var ada = new Date();
  console.log(ada);

  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  var yesterday1 = new Date();
  yesterday1.setDate(yesterday1.getDate() - 2);

  var yesterday2 = new Date();
  yesterday2.setDate(yesterday2.getDate() - 3);

  var yesterday3 = new Date();
  yesterday3.setDate(yesterday3.getDate() - 4);

  var yesterday4 = new Date();
  yesterday4.setDate(yesterday4.getDate() - 5);

  var yesterday5 = new Date();
  yesterday5.setDate(yesterday5.getDate() - 6);

  var yesterday6 = new Date();
  yesterday6.setDate(yesterday6.getDate() - 7);

  var yesterday7 = new Date();
  yesterday7.setDate(yesterday7.getDate() - 8);

  var yesterday8 = new Date();
  yesterday8.setDate(yesterday8.getDate() - 9);

  var yesterday9 = new Date();
  yesterday9.setDate(yesterday9.getDate() - 10);

  var yesterday10 = new Date();
  yesterday10.setDate(yesterday10.getDate() - 11);

  var yesterday11 = new Date();
  yesterday11.setDate(yesterday11.getDate() - 12);

  var yesterday12 = new Date();
  yesterday12.setDate(yesterday12.getDate() - 13);

  var yesterday13 = new Date();
  yesterday13.setDate(yesterday13.getDate() - 14);

  var yesterday14 = new Date();
  yesterday14.setDate(yesterday14.getDate() - 15);

  var yesterday15 = new Date();
  yesterday15.setDate(yesterday15.getDate() - 16);

  var yesterday16 = new Date();
  yesterday16.setDate(yesterday16.getDate() - 17);

  var yesterday17 = new Date();
  yesterday17.setDate(yesterday17.getDate() - 18);

  var yesterday18 = new Date();
  yesterday18.setDate(yesterday18.getDate() - 19);

  var yesterday19 = new Date();
  yesterday19.setDate(yesterday19.getDate() - 20);

  var yesterday20 = new Date();
  yesterday20.setDate(yesterday20.getDate() - 21);

  var yesterday21 = new Date();
  yesterday21.setDate(yesterday21.getDate() - 22);

  var yesterday22 = new Date();
  yesterday22.setDate(yesterday22.getDate() - 23);

  var yesterday23 = new Date();
  yesterday23.setDate(yesterday23.getDate() - 24);

  var yesterday24 = new Date();
  yesterday24.setDate(yesterday24.getDate() - 25);

  var yesterday25 = new Date();
  yesterday25.setDate(yesterday25.getDate() - 26);

  var yesterday26 = new Date();
  yesterday26.setDate(yesterday26.getDate() - 27);

  var yesterday27 = new Date();
  yesterday27.setDate(yesterday27.getDate() - 28);

  var yesterday28 = new Date();
  yesterday28.setDate(yesterday28.getDate() - 29);

  var yesterday29 = new Date();
  yesterday29.setDate(yesterday29.getDate() - 30);

  var yesterday30 = new Date();
  yesterday30.setDate(yesterday30.getDate() - 31);

  var payload = {
    todayCandidates: 0,
    yesterdayCandidates: 0,
    yesterday1Candidates: 0,
    yesterday2Candidates: 0,
    yesterday3Candidates: 0,
    yesterday4Candidates: 0,
    yesterday5Candidates: 0,
    yesterday6Candidates: 0,
    yesterday7Candidates: 0,
    yesterday8Candidates: 0,
    yesterday9Candidates: 0,
    yesterday10Candidates: 0,
    yesterday11Candidates: 0,
    yesterday12Candidates: 0,
    yesterday13Candidates: 0,
    yesterday14Candidates: 0,
    yesterday15Candidates: 0,
    yesterday16Candidates: 0,
    yesterday17Candidates: 0,
    yesterday18Candidates: 0,
    yesterday19Candidates: 0,
    yesterday20Candidates: 0,
    yesterday21Candidates: 0,
    yesterday22Candidates: 0,
    yesterday23Candidates: 0,
    yesterday24Candidates: 0,
    yesterday25Candidates: 0,
    yesterday26Candidates: 0,
    yesterday27Candidates: 0,
    yesterday28Candidates: 0,
    yesterday29Candidates: 0,
    
  };

  // ada.setDate(ada.getDate() -2);
  console.log("yesterday - " + yesterday.toISOString().slice(0, 10));

  Candidate.find({
    date: {
      $gt: yesterday1.toISOString().slice(0, 10) + "T23:59:59.000Z",
      $lt: yesterday.toISOString().slice(0, 10) + "T23:59:59.000Z"
    }
  }).then(doc1 => {
    payload.yesterdayCandidates = doc1.length;
    Candidate.find({
      date: {
        $gt: yesterday2.toISOString().slice(0, 10) + "T23:59:59.000Z",
        $lt: yesterday1.toISOString().slice(0, 10) + "T23:59:59.000Z"
      }
    }).then(doc2 => {
      payload.yesterday1Candidates = doc2.length;
      Candidate.find({
        date: {
          $gte: yesterday3.toISOString().slice(0, 10) + "T23:59:59.000Z",
          $lt: yesterday2.toISOString().slice(0, 10) + "T23:59:59.000Z"
        }
      }).then(doc3 => {
        //payload.yesterdayCandidates=doc.length;
        payload.yesterday2Candidates = doc3.length;
        Candidate.find({
          date: {
            $gte: yesterday4.toISOString().slice(0, 10) + "T23:59:59.000Z",
            $lt: yesterday3.toISOString().slice(0, 10) + "T23:59:59.000Z"
          }
        }).then(doc4 => {
          payload.yesterday3Candidates = doc4.length;
          Candidate.find({
            date: {
              $gte: yesterday5.toISOString().slice(0, 10) + "T23:59:59.000Z",
              $lt: yesterday4.toISOString().slice(0, 10) + "T23:59:59.000Z"
            }
          }).then(doc5 => {
            payload.yesterday4Candidates = doc5.length;
            Candidate.find({
              date: {
                $gte: yesterday6.toISOString().slice(0, 10) + "T23:59:59.000Z",
                $lt: yesterday5.toISOString().slice(0, 10) + "T23:59:59.000Z"
              }
            }).then(doc6 => {
              payload.yesterday5Candidates = doc6.length;
              Candidate.find({
                date: {
                  $gte:
                    yesterday7.toISOString().slice(0, 10) + "T23:59:59.000Z",
                  $lt: yesterday6.toISOString().slice(0, 10) + "T23:59:59.000Z"
                }
              }).then(doc7 => {
                payload.yesterday6Candidates = doc7.length;
                Candidate.find({
                  date: {
                    $gte:yesterday8.toISOString().slice(0, 10) + "T23:59:59.000Z", //new Date().toISOString().slice(0,10)
                    $lt:yesterday7.toISOString().slice(0, 10) + "T23:59:59.000Z"
                  }
                }).then(doc8 => {
                  payload.yesterday7Candidates = doc8.length;
                  Candidate.find({
                    date: {
                      $gte: ada.toISOString().slice(0, 10) + "T00:00:00.000Z"  
                    }
                  }).then(doc9 => {
                    payload.todayCandidates = doc9.length;

                    Candidate.find({
                      date: {
                        $gte:yesterday9.toISOString().slice(0, 10) + "T23:59:59.000Z", //new Date().toISOString().slice(0,10)
                        $lt:yesterday8.toISOString().slice(0, 10) + "T23:59:59.000Z" 
                      }
                    }).then(doc10 => {
                      payload.yesterday8Candidates = doc10.length;
  
                      Candidate.find({
                        date: {
                          $gte:yesterday10.toISOString().slice(0, 10) + "T23:59:59.000Z", //new Date().toISOString().slice(0,10)
                          $lt:yesterday9.toISOString().slice(0, 10) + "T23:59:59.000Z" 
                        }
                      }).then(doc11 => {
                        payload.yesterday9Candidates = doc11.length;
    
                        Candidate.find({
                          date: {
                            $gte:yesterday11.toISOString().slice(0, 10) + "T23:59:59.000Z", //new Date().toISOString().slice(0,10)
                            $lt:yesterday10.toISOString().slice(0, 10) + "T23:59:59.000Z" 
                          }
                        }).then(doc12 => {
                          payload.yesterday10Candidates = doc12.length;
      
                          Candidate.find({
                            date: {
                              $gte:yesterday12.toISOString().slice(0, 10) + "T23:59:59.000Z", //new Date().toISOString().slice(0,10)
                              $lt:yesterday11.toISOString().slice(0, 10) + "T23:59:59.000Z" 
                            }
                          }).then(doc13 => {
                            payload.yesterday11Candidates = doc13.length;
        
                            Candidate.find({
                              date: {
                                $gte:yesterday13.toISOString().slice(0, 10) + "T23:59:59.000Z", //new Date().toISOString().slice(0,10)
                                $lt:yesterday12.toISOString().slice(0, 10) + "T23:59:59.000Z" 
                              }
                            }).then(doc14 => {
                              payload.yesterday12Candidates = doc14.length;
          
                              Candidate.find({
                                date: {
                                  $gte:yesterday14.toISOString().slice(0, 10) + "T23:59:59.000Z", //new Date().toISOString().slice(0,10)
                                  $lt:yesterday13.toISOString().slice(0, 10) + "T23:59:59.000Z" 
                                }
                              }).then(doc15 => {
                                payload.yesterday13Candidates = doc15.length;
            
                                Candidate.find({
                                  date: {
                                    $gte:yesterday15.toISOString().slice(0, 10) + "T23:59:59.000Z", //new Date().toISOString().slice(0,10)
                                    $lt:yesterday14.toISOString().slice(0, 10) + "T23:59:59.000Z" 
                                  }
                                }).then(doc16 => {
                                  payload.yesterday14Candidates = doc16.length;
              
                                  Candidate.find({
                                    date: {
                                      $gte:yesterday16.toISOString().slice(0, 10) + "T23:59:59.000Z", //new Date().toISOString().slice(0,10)
                                      $lt:yesterday15.toISOString().slice(0, 10) + "T23:59:59.000Z" 
                                    }
                                  }).then(doc17 => {
                                    payload.yesterday15Candidates = doc17.length;
                
                                    Candidate.find({
                                      date: {
                                        $gte:yesterday17.toISOString().slice(0, 10) + "T23:59:59.000Z", //new Date().toISOString().slice(0,10)
                                        $lt:yesterday16.toISOString().slice(0, 10) + "T23:59:59.000Z" 
                                      }
                                    }).then(doc18 => {
                                      payload.yesterday16Candidates = doc18.length;
                  
                                      Candidate.find({
                                        date: {
                                          $gte:yesterday18.toISOString().slice(0, 10) + "T23:59:59.000Z", //new Date().toISOString().slice(0,10)
                                          $lt:yesterday17.toISOString().slice(0, 10) + "T23:59:59.000Z" 
                                        }
                                      }).then(doc19 => {
                                        payload.yesterday17Candidates = doc19.length;
                    
                                        Candidate.find({
                                          date: {
                                            $gte:yesterday19.toISOString().slice(0, 10) + "T23:59:59.000Z", //new Date().toISOString().slice(0,10)
                                            $lt:yesterday18.toISOString().slice(0, 10) + "T23:59:59.000Z" 
                                          }
                                        }).then(doc20 => {
                                          payload.yesterday18Candidates = doc20.length;
                      
                                          Candidate.find({
                                            date: {
                                              $gte:yesterday20.toISOString().slice(0, 10) + "T23:59:59.000Z", //new Date().toISOString().slice(0,10)
                                              $lt:yesterday19.toISOString().slice(0, 10) + "T23:59:59.000Z" 
                                            }
                                          }).then(doc21 => {
                                            payload.yesterday19Candidates = doc21.length;
                        
                                            Candidate.find({
                                              date: {
                                                $gte:yesterday21.toISOString().slice(0, 10) + "T23:59:59.000Z", //new Date().toISOString().slice(0,10)
                                                $lt:yesterday20.toISOString().slice(0, 10) + "T23:59:59.000Z" 
                                              }
                                            }).then(doc22 => {
                                              payload.yesterday20Candidates = doc22.length;
                          
                                              Candidate.find({
                                                date: {
                                                  $gte:yesterday22.toISOString().slice(0, 10) + "T23:59:59.000Z", //new Date().toISOString().slice(0,10)
                                                  $lt:yesterday21.toISOString().slice(0, 10) + "T23:59:59.000Z" 
                                                }
                                              }).then(doc23 => {
                                                payload.yesterday21Candidates = doc23.length;
                            
                                                Candidate.find({
                                                  date: {
                                                    $gte:yesterday23.toISOString().slice(0, 10) + "T23:59:59.000Z", //new Date().toISOString().slice(0,10)
                                                    $lt:yesterday22.toISOString().slice(0, 10) + "T23:59:59.000Z" 
                                                  }
                                                }).then(doc24 => {
                                                  payload.yesterday22Candidates = doc24.length;
                              
                                                  Candidate.find({
                                                    date: {
                                                      $gte:yesterday24.toISOString().slice(0, 10) + "T23:59:59.000Z", //new Date().toISOString().slice(0,10)
                                                      $lt:yesterday23.toISOString().slice(0, 10) + "T23:59:59.000Z" 
                                                    }
                                                  }).then(doc25 => {
                                                    payload.yesterday23Candidates = doc25.length;
                                
                                                    Candidate.find({
                                                      date: {
                                                        $gte:yesterday25.toISOString().slice(0, 10) + "T23:59:59.000Z", //new Date().toISOString().slice(0,10)
                                                        $lt:yesterday24.toISOString().slice(0, 10) + "T23:59:59.000Z" 
                                                      }
                                                    }).then(doc26 => {
                                                      payload.yesterday24Candidates = doc26.length;
                                  
                                                      Candidate.find({
                                                        date: {
                                                          $gte:yesterday26.toISOString().slice(0, 10) + "T23:59:59.000Z", //new Date().toISOString().slice(0,10)
                                                          $lt:yesterday25.toISOString().slice(0, 10) + "T23:59:59.000Z" 
                                                        }
                                                      }).then(doc27 => {
                                                        payload.yesterday25Candidates = doc27.length;
                                    
                                                        Candidate.find({
                                                          date: {
                                                            $gte:yesterday27.toISOString().slice(0, 10) + "T23:59:59.000Z", //new Date().toISOString().slice(0,10)
                                                            $lt:yesterday26.toISOString().slice(0, 10) + "T23:59:59.000Z" 
                                                          }
                                                        }).then(doc28 => {
                                                          payload.yesterday26Candidates = doc28.length;
                                      
                                                          Candidate.find({
                                                            date: {
                                                              $gte:yesterday28.toISOString().slice(0, 10) + "T23:59:59.000Z", //new Date().toISOString().slice(0,10)
                                                              $lt:yesterday27.toISOString().slice(0, 10) + "T23:59:59.000Z" 
                                                            }
                                                          }).then(doc29 => {
                                                            payload.yesterday27Candidates = doc29.length;
                                        
                                                            Candidate.find({
                                                              date: {
                                                                $gte:yesterday29.toISOString().slice(0, 10) + "T23:59:59.000Z", //new Date().toISOString().slice(0,10)
                                                                $lt:yesterday28.toISOString().slice(0, 10) + "T23:59:59.000Z" 
                                                              }
                                                            }).then(doc30 => {
                                                              payload.yesterday28Candidates = doc30.length;
                                          
                                                              Candidate.find({
                                                                date: {
                                                                  $gte:yesterday30.toISOString().slice(0, 10) + "T23:59:59.000Z", //new Date().toISOString().slice(0,10)
                                                                  $lt:yesterday29.toISOString().slice(0, 10) + "T23:59:59.000Z" 
                                                                }
                                                              }).then(doc31 => {
                                                                payload.yesterday29Candidates = doc31.length;
                                            
                                                                
                                                                  
                                                                      
                                                                         
                                                                           
                                                                    
                                                                  });
                                                                });
                                                              });
                                                            });
                                                          });
                                                        });
                                                      });
                                                    });
                                                  });
                                                });
                                              });
                                            });
                                          });
                                        });
                                      });
                                    });
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  // });
// });

module.exports = router;

// Candidate.aggregate()
//   .lookup({
//     from: "User",
//     localField: "assignToshortlisterbyId",
//     foreignField: "_id",
//     as: "User"
//   })

//   .then(doc => {
//     console.log("ppp - " + JSON.stringify(doc));
//   });

// Candidate.findOne({ email: "dewindi@anushika.com1111111" }).then(doc => {
//   console.log("oo - " + JSON.stringify(doc.shortlisterID));
// });

//res.send('hello')

// var salt = bcrypt.genSaltSync(saltRounds);
// var hash = bcrypt.hashSync("admin", salt);

// const newuser = new User({
//   email: "admin@auxenta.com",
//   hash: hash
// });

// newuser
//   .save()
//   .then(result => {
//     res.send(result);
//   })
//   .catch(err => {
//     res.json(err);
//   });
