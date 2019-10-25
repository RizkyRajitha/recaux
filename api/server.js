const express = require("express");

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const path = require("path");
const eh = require("errorhandler");
const cors = require("cors");
const mongoose = require("mongoose");
const bp = require("body-parser");
const passport = require("passport");
const User = require("./db/users");
const Candidate = require("./db/candidates");
const Notifications = require("./db/nortification");
const ObjectID = require("mongodb").ObjectID;
const fs = require("fs");
const jwt = require("jsonwebtoken");
// const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./config/swagger.json");
const Pusher = require("pusher-js/node");

//var Pusherv2 = require('pusher');

const cloudinary = require("cloudinary").v2;

//const keys = require("./config/keys");
const port = process.env.PORT || 3001;

mongoose.Promise = global.Promise;
//"mongodb://127.0.0.1:27017/authdb" ||
const mongodbAPI = "mongodb://127.0.0.1:27017/authdb"; //keys.mongouri;
app.use(require("express-status-monitor")());
//const app = express();

app.use(passport.initialize());
app.use(cors());
app.use(require("morgan")("dev"));
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());
var logger = function(req, res, next) {
  var eventtime = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Colombo"
  });

  var usertoken = req.headers.authorization;
  var uname = "";
  var ipaddr = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  if (usertoken) {
    try {
      var decode = jwt.verify(usertoken, "authdemo");
      User.findOne({ _id: decode.id })
        .then(ussr => {
          uname = ussr.firstName + " " + ussr.lastName;

          console.log("on :" + eventtime);

          var str = ` ${eventtime} ; ip  ${ipaddr}  ; endpoint - ${
            req.originalUrl
          } ; user - ${uname} ; data - ${JSON.stringify(req.body)}  \n`;

          var pt = path.join(__dirname, "config", "log.txt");
          console.log(pt);
          console.log("yoloylylylylylyylylyylylylyl");
          try {
            fs.appendFile(pt, str, function(err) {
              if (err) {
                console.log(err);
              } else {
                console.log("Saved!");
              }
            });
          } catch (err) {
            console.log(err);
          }
        })
        .catch(err => {
          console.log(err);
          var str = ` ${eventtime} : endpoint - ${
            req.originalUrl
          } | user - ${uname} | data - ${JSON.stringify(req.body)}  \n`;
          try {
            fs.appendFile(pt, str, function(err) {
              if (err) {
                console.log(err);
              } else {
                console.log("Saved!");
              }
            });
          } catch (err) {
            console.log(err);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
  next();
};
app.use(logger);
//app.use("/static", express.static(path.join(__dirname, "../assets")));
//app.use(express.static('../client/public'));

// /home/dealwithit/Documents/dev/recaux/client/build

app.use(
  "/evaluation",
  express.static(path.join(__dirname, "../assets/evaluationforms/"))
);

app.use("/usr", require("./routes/routes"));

// app.use(express.static("../client/build"));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../", "client", "build", "index.html"));
// });

// app.get("/ws", (req, res) => {
//   console.log("ws test.....");
//   io.emit("new_candidate", [{ msg: "hola" }, { msg: "aloha" }]);
//   res.send("juhu");
// });

/******************************************************************* */

cloudinary.config({
  cloud_name: "dijjqfsto",
  api_key: "943785761215535",
  api_secret: "MSfacY2b-OGHnjJLiLni9zfH1R0"
});

var pusher = new Pusher("5270bfbdce0a09599eb2", {
  cluster: "ap2",
  forceTLS: true
});

// var pusherv2 = new Pusher({
//   appId: '799912',
//   key: 'b02c2f065b3f7b576d53',
//   secret: 'dd121b2ae91e519de8e3',
//   cluster: 'ap2',
//   encrypted: true
// });

// pusherv2.trigger('my-channel', 'my-event', {
//   "message": "hello world"
// });

//app.use(express.static("client/build"));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../",'client', "public", "index.html"));
// });

var options = {
  explorer: true
};

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

app.use(eh());

const user = require("./db/users");
//const passport = require("./config/passport");

try {
  mongoose.connect(mongodbAPI, { useNewUrlParser: true }, err => {
    if (!err) console.log("connected to mongodb sucsessfully" + "👍");
  });
} catch (error) {
  console.log(err);
}

mongoose.set("debug", true);

var channel = pusher.subscribe("my-channel");

// var channel2 = pusher.

channel.bind("my-event", function(data) {
  console.log("new candidate recieved");
  console.log(JSON.stringify(data));
  // console.log(data.skillset[2]);
  ///home/dealwithit/machine_learning_venv

  var skillarr = [];

  data.skillset.forEach((element, index) => {
    skillarr.push({ value: index, label: element });
  });

  console.log(skillarr);

  const newcandidate = new Candidate({
    email: data.from_email,
    name: data.from_name,
    date: new Date().toISOString(),
    source: "email",
    skills: skillarr,
    jobspec: data.jobspec
  });
  var nortiflist = [];
  newcandidate
    .save()
    .then(result => {
      console.log("file name - " + data.message);
      //var cvexte = path.extname(req.file.originalname);

      var cvno = result.cvUrl.length;
      console.log("cv number - " + cvno);

      var filePath =
        "/home/dealwithit/Documents/dev/recaux/assets/cv/" + data.message;

      cloudinary.uploader.upload(
        ///home/dealwithit/machine_learning_venv/rajithagunathilake@gmail.com-16.pdf
        filePath,
        {
          tags: "basic_sample",
          folder: "recaux/resume",
          public_id: result._id + "_" + cvno,
          sign_url: true
        },
        function(err, cvuploaddata) {
          console.log();
          console.log("** File Upload");
          if (err) {
            console.warn(err);
          }
          console.log(
            "* public_id for the uploaded pdf is generated by Cloudinary's service."
          );
          console.log("* " + cvuploaddata.public_id);
          console.log("* " + cvuploaddata.url);

          Candidate.updateOne(
            { _id: result._id },
            {
              $push: {
                cvUrl: {
                  url: cvuploaddata.url,
                  recievedDate: new Date().toISOString()
                }
              }
            }
          )
            .then(doc => {
              fs.unlinkSync(filePath);
              console.log(cvuploaddata);

              User.find({
                $or: [{ usertype: "hr_staff" }]
              })
                .then(doc => {
                  // var nortiflist = [];
                  nortiflist = [];
                  doc.forEach(ele => {
                    nortiflist.push(ele._id);
                  });

                  const newnot = new Notifications({
                    dis: ` you have new candidate  ${result.name} `,
                    title: "new candidate",
                    time: new Date().toISOString(),
                    userIdShow: nortiflist,
                    candidateId: result._id
                  });

                  newnot
                    .save()
                    .then(docs => {
                      var objdocs = docs.toObject();
                      objdocs.candidateId = datain.candidateid;
                      // serverss.wsfunc("new_interview", docs);
                      // res.status(200).json({ msg: "sucsess" });
                    })
                    .catch(err => {
                      console.log(err);
                    });

                  //io.emit("new_candidate", result);
                })
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(err => console.log(err));

          //res.status(200).json(result);
        }
      );
    })
    .catch(err => {
      //console.log(err);

      if (err.code === 11000) {
        console.log(
          " reg err duplicate email found ************************************************************************************"
        );

        Candidate.findOne({ email: data.from_email }).then(dupcandoc => {
          console.log("dup can id - " + dupcandoc);
          console.log("dup can id - " + dupcandoc.id);
          var cvno = dupcandoc.cvUrl.length;
          console.log("cv number - " + cvno);
          console.log("file name - " + data.message);

          var filePath =
            "/home/dealwithit/Documents/dev/recaux/assets/cv/" + data.message;
          //var cvexte = path.extname(req.file.originalname);
          cloudinary.uploader.upload(
            ///home/dealwithit/machine_learning_venv/rajithagunathilake@gmail.com-16.pdf
            filePath,
            {
              tags: "basic_sample",
              folder: "recaux/resume",
              public_id: dupcandoc._id + "_" + cvno,
              sign_url: true
            },
            function(err, cvuploaddata) {
              console.log();
              console.log("** File Upload");
              if (err) {
                console.warn(err);
              }
              console.log(
                "* public_id for the uploaded pdf is generated by Cloudinary's service."
              );
              console.log("* " + cvuploaddata.public_id);
              console.log("* " + cvuploaddata.url);

              Candidate.updateOne(
                { _id: dupcandoc._id },
                {
                  $push: {
                    cvUrl: {
                      url: cvuploaddata.url,
                      recievedDate: new Date().toISOString()
                    }
                  },
                  $set: {
                    skills: skillarr,
                    jobspec: data.jobspec
                  }
                }
              )
                .then(doc => {
                  User.find({
                    usertype: "hr_staff"
                  })
                    .then(doc => {
                      console.log(doc);
                      nortiflist = [];
                      doc.forEach(ele => {
                        nortiflist.push(ele._id.toString());
                      });

                      const newnot = new Notifications({
                        dis: ` you have new cv from a old \\n candidate  ${dupcandoc.name} `,
                        title: "new candidate",
                        time: new Date().toISOString(),
                        userIdShow: nortiflist,
                        candidateId: dupcandoc._id
                      });
                      console.log("new ");
                      newnot.save(doc => {
                        console.log("new nortif");
                      });
                    })
                    .catch(err => console.log(err));

                  fs.unlinkSync(filePath);
                  // Candidate.findById(ObjectID(dupcandoc._id))
                  //   .then(canupdateddco => {
                  //     console.log(canupdateddco);
                  //     io.emit("new_candidate", canupdateddco);
                  //     ress.status(200).json(canupdateddco.cvUrl);
                  //   })
                  //   .catch(err => {
                  //     console.log(err);
                  //   });
                })
                .catch(err => {});

              //res.status(403).json({ errcode: err.code, dupcanid: dupcandoc.id });
            }
          );

          //res.status(403).json({ errcode: err.code, dupcanid: dupcandoc.id });
        });
      } else {
        //res.status(403).json(err);
      }
    });
});

io.on("connection", sock => {
  console.log("user connected");
  sock.on("disconnect", () => {
    console.log("user disconnected");
  });
});

module.exports.wsfunc = (eventname, data) => {
  io.emit(eventname, data);
};

http.listen(port, () => {
  console.log("listning on 3001");
});
