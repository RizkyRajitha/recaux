var nodemailer = require("nodemailer");
//const config = require("./keys");
var jwt = require("jsonwebtoken");
const path = require("path");
const hbs = require("nodemailer-express-handlebars");
//const hbss = require("handlebars");

const passwordResetApi = "http://localhost:3000/resetpassword";
const emailConfirmApi = "http://localhost:3000/confirmemail";
const newuserconfig = "http://localhost:3000/newuserconfig";
///

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kithminiatdev@gmail.com",
    pass: "ujotwkdnwgilpkcu"
  }
});

// viewEngine: {
// extName: '.hbs',
// partialsDir: 'some/path',
//   layoutsDir: 'some/path',
//   defaultLayout: 'email.body.hbs',
// },
// viewPath: 'some/path',
// extName: '.hbs'

transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extName: ".hbs",
      partialsDir: path.join(__dirname, "./views/partials"),
      layoutsDir: path.join(__dirname, "./views/layouts")
    },
    viewPath: path.join(__dirname, "./views/partials"),
    extName: ".hbs"
  })
);

//var a = require("./emails/mars/")
//console.log(config.jwtexp)

exports.mailhandlerpasswordreset = (ursname, emaill, id, hash) => {
  console.log("password reset");
  //console.log("path - " + path.join(__dirname, "emails", "mars"));

  console.log(ursname);

  jwt.sign(
    { id: id, prehash: hash },
    "authdemo",
    { expiresIn: "10m" },
    function(err, token) {
      const mailOptions = {
        from: "kithminiatdev@gmail.com",
        to: "rajithagunathilake@gmail.com",
        subject: "password reset",

        template: "Reset",
        context: {
          title: "password reset",
          msg: `${passwordResetApi}/${token}`,
          name: ursname,
          date: new Date().toUTCString(),
          uniqeid: Math.round(Math.random() * 10000000000000)
        }
        // html: `<h1> please visit -${passwordResetApi}/${token}  to reset your password </h1>`
      };

      console.log("send > > > > >> > ");
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("mail senddd");
          console.log("send email - ");
          console.log("Email sent: " + info.response);
        }
      });
    }
  );
};

exports.mailhandlerinterviewconfirmation = (
  candidatename,
  hrname,
  canemail,
  date
) => {
  console.log(candidatename);
  console.log(hrname);
  console.log(canemail);
  console.log(date);

  var datetime = new Date(date);

  var interviewdate = datetime.toString().slice(0, 15);

  console.log("date - " + interviewdate);

  var options = {
    // weekday: "long",
    // year: "numeric",
    // month: "long",
    // day: "numeric",
    timeZone: "Asia/Colombo"
  };

  var interviewtime = datetime.toLocaleTimeString("en-US", options);

  console.log("time " + interviewtime);

  // console.log(event.toLocaleDateString('de-DE', options));

  console.log("date - " + interviewdate);

  console.log("sending confirm interview email ............");
  var mailOptions = {
    from: "kithminiatdev@gmail.com",
    to: "rajithagunathilake@gmail.com",
    subject: "Interview confirmation",
    text: "visit - ",
    template: "Interview",
    context: {
      date: interviewdate,
      time: interviewtime,
      name: candidatename,
      hrperson: hrname,
      genon: new Date().toUTCString(),
      uniqeid: Math.round(Math.random() * 10000000000000)
    }
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      // console.log("send email - " + email);
      console.log("Email sent: " + info.response);
    }
  });
};

exports.mailhandlernewuseremail = (email, id, type) => {
  jwt.sign(
    { id: id, email: email, usertype: type },
    "authdemo",
    {
      expiresIn: "30m"
    },
    function(err, data) {
      console.log(err);

      var mailOptions = {
        from: "kithminiatdev@gmail.com",
        to: "rajithagunathilake@gmail.com",
        subject: "email confirmation",
        text: "visit - ",
        template: "confirmEmail",
        context: {
          title: " confirm email ",
          msg: `${newuserconfig}/${data}`,
          uniqeid: Math.floor(Math.random() * 1000000),
          date: new Date().toUTCString()
        }
      };

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("send email - ");
          console.log("Email sent: " + info.response);
        }
      });
    }
  );
};

//module.exports = {mailhandlerpasswordreset,mailhandleremailconfirm};
