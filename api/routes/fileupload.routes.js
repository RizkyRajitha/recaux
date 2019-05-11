const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const passport = require("passport");
const User = require('../db/users')

cloudinary.config({
  cloud_name: "dijjqfsto",
  api_key: "943785761215535",
  api_secret: "MSfacY2b-OGHnjJLiLni9zfH1R0"
});

const storageAvatar = multer.diskStorage({
  destination: "../assets/avatar",
  filename: function(req, file, cb) {
    console.log(req.params.id);

    cb(null, req.params.id + path.extname(file.originalname));
  }
});

const storageCv = multer.diskStorage({
  destination: "../assets/cv",
  filename: function(req, file, cb) {
    console.log(req.params.id);

    cb(null, req.params.id + path.extname(file.originalname));
  }
});

const avatarUpload = multer({ storage: storageAvatar }).single("avatar");
const cvUpload = multer({ storage: storageCv }).single("cv");

exports.profileimgup = (req, ress, next) => {
  var res = "";
  passport.authenticate(
    "jwtstrategy",
    { session: false },
    (err, user, info) => {
      console.log(JSON.stringify(req.headers.authorization));
     

      console.log("baba yaga");

      if (!user) {
        console.log('error - '+info)
        ress.status(401).json(info);
      } else {
        avatarUpload(req, res, err => {
          if (err) {
            console.log(err);
          } else {
            console.log(path.extname(req.file.originalname));
            var imgexte = path.extname(req.file.originalname);
            cloudinary.uploader.upload(
              "/home/dealwithit/Desktop/sepro/recaux/assets/avatar/" +
                req.params.id +
                imgexte,
              {
                tags: "basic_sample",
                folder: "recaux/avatar",
                public_id: req.params.id,
                sign_url: true
              },
              function(err, image) {
                console.log();
                console.log("** File Upload");
                if (err) {
                  console.warn(err);
                }
                console.log(
                  "* public_id for the uploaded image is generated by Cloudinary's service."
                );
                console.log("* " + image.public_id);
                console.log("* " + image.url);

                User.updateOne({_id:user.id},{$set:{avatarUrl:image.url}}).then(doc=>{
                  ress.status(200).json(image);
                }).catch(err=>{
                  
                })

                ress.status(200).json(image);

                // waitForAllUploads("pizza",err,image);
              }
            );

            console.log(req.file);
          }
        });
      }
    }
  )(req, res, next);
};

exports.cvupload = (req, res) => {
  console.log("req came cv");

  cvUpload(req, res, err => {
    if (err) {
      console.log(err);
    } else {
      console.log(req.file);
    }
  });

  console.log("req go cv");
};
