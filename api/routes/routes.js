const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../db/users");
const Candidate = require('../db/candidates')
const ObjectID = require("mongodb").ObjectID;
require("../config/passport");
const emailhandler = require("../config/emailhandler");
const path = require('path')
//const mailhandleremailconfirm = require('../config/emailhandler')

// router.use(function(req, res) {
// 	res.sendFile(path.join(__dirname, '/../../client/build/index.html'));
// });



router.post("/reg", (req, res) => {
  console.log(req.body);

  console.log(`************${req.headers.authorization}****************`);

  const newuser = new User({
    email: req.body.email,
    hash: req.body.password
  });
  console.log(`email - ${req.body.email}  pass - ${req.body.password}`);
  //newuser.setpass(req.body.password);
  newuser
    .save()
    .then(result => {
      console.log("succsess");
      var token = result.generateJWT();
      return res.status(200).send(token);
    })
    .catch(err => {
      console.log(" reg err -  " + err);
      res.status(403).json(err);
    });
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
        res.send(user);
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

      console.log("hiiii");
      var iid = req.params.id;
      console.log(iid);

      User.findById(ObjectID(iid))
        .then(result => {
          console.log("found" + result);
          res.json(result);
        })
        .catch(err => {
          console.log("err - " + err);
        });
    }
  )(req, res, next);
});

router.post("/sendconfirmemail/:id", (req, res) => {
  console.log(req.params.id);

  User.findById(ObjectID(req.params.id))
    .then(doc => {
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

  User.find({ email: email }).then(result => {
    if (!result) {
      console.log(result + "not found error");
      res.send("no user found");
    } else {
      emailhandler.mailhandlerpasswordreset(email, result[0]._id);
      console.log(result[0]._id);
      res.json(result);
    }
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

router.post('/getcandidate/:id',(req,res)=>{

  


})

router.post('/addcandidate',(req,res)=>{
  console.log(req.body)

  const newcandidate = new Candidate({
    email:req.body.candidateemail,
    name:req.body.candidatename,
    jobspec:req.body.candidatejobspec
  })

  newcandidate.save().then(result=>{
    res.status(200).json(result)
  }).catch(err=>{
    res.status(403).json(err)
  })

    

})

// router.get(
//   "/protected",
//   passport.authenticate("jwtstrategy", { session: false }),
//   (req, res) => {
//     const { user } = req;

//     res.status(200).send({ user });
//   }
// );

module.exports = router;
