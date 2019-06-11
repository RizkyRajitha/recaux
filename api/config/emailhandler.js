var nodemailer = require("nodemailer");
//const config = require("./keys");
var jwt = require("jsonwebtoken");
const path = require("path");
const hbs = require("nodemailer-express-handlebars");

const passwordResetApi = "http://localhost:3000/resetpassword";
const emailConfirmApi = "http://localhost:3000/confirmemail";

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
      partialsDir: "/home/dealwithit/Documents/dev/recaux/api/config/views/partials/",
      layoutsDir: "/home/dealwithit/Documents/dev/recaux/api/config/views/layouts/",
      
    },
    viewPath: "/home/dealwithit/Documents/dev/recaux/api/config/views/partials/",
    extName: ".hbs"
  }) 
);
 
//var a = require("./emails/mars/")
//console.log(config.jwtexp)

exports.mailhandlerpasswordreset = (ursname,emaill, id) => {
  console.log("password reset");
  //console.log("path - " + path.join(__dirname, "emails", "mars"));

  // const email = new Email({
  //   template: path.join(__dirname, "emails", "mars"),
  //   message: {
  //     from: "kithminiatdev@gmail.com"
  //   },
  //   // uncomment below to send emails in development/test env:
  //   // send: true
  //   transporter
  // });

  // email
  //   .send({
  //     template: "mars",
  //     message: {
  //       to: "rajithagunathilake@gmail.com"
  //     },
  //     locals: {
  //       name: "Elon"
  //     }
  //   })
  //   .then(console.log)
  console.log(ursname)

  try {
    var token = jwt.sign({"id":id},'authdemo', { expiresIn: "10m" })
  } catch (error) {
    console.log(error)
  }

  var mailOptions = {
    from: "kithminiatdev@gmail.com", 
    to: "rajithagunathilake@gmail.com",
    subject: "password reset",
    text: "visit - ",
    template: "temp2",
    context:{title:"password reset",message:`${passwordResetApi}/${token}`,name:ursname  }
    // html: `<h1> please visit -${passwordResetApi}/${token}  to reset your password </h1>`
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("send email - " + email);
      console.log("Email sent: " + info.response);
    }
  });
};

exports.mailhandleremailconfirm = (ursname, email, id) => {
  try {
    var token = jwt.sign({ id: id }, "authdemo", { expiresIn: "10m" });
  } catch (error) {
    console.log(error);
  }

  console.log("sending confirm email ............");
  var mailOptions = {
    from: "kithminiatdev@gmail.com", 
    to: "rajithagunathilake@gmail.com", 
    subject: "email confirmation", 
    text: "visit - ", 
    template: "templtt", 
    context:{title:" confirm email ",message:`${emailConfirmApi}/${token}`,name:ursname  }
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("send email - " + email);
      console.log("Email sent: " + info.response);
    }
  });
};

//module.exports = {mailhandlerpasswordreset,mailhandleremailconfirm};
