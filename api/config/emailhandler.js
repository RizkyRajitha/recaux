
var nodemailer = require('nodemailer');
const config = require('./keys')

const passwordResetApi = 'http://localhost:3000/resetpassword';
const emailConfirmApi = 'http://localhost:3000/confirmemail';

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kithminiatdev@gmail.com',
    pass: config.apppassword  //'ujotwkdnwgilpkcu'
  }
});

//console.log(config.jwtexp)


exports.mailhandlerpasswordreset =(email,id)=>{


    var mailOptions = {
        from: 'kithminiatdev@gmail.com',
        to: 'rajithagunathilake@gmail.com',
        subject: 'password reset',
        text: 'visit - ',
        html:`<h1> please visit -${passwordResetApi}/${id}  to reset your password </h1>`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
            console.log('send email - '+email)
          console.log('Email sent: ' + info.response);
        }
      }); 
      

}


exports.mailhandleremailconfirm =(email,id)=>{

console.log('sending confirm email ............')
  var mailOptions = {
      from: 'kithminiatdev@gmail.com',
      to: 'rajithagunathilake@gmail.com',
      subject: 'email confirmation',
      text: 'visit - ',
      html:`<h1> please visit -${emailConfirmApi}/${id}  to confirm your email </h1>`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
          console.log('send email - '+email)
        console.log('Email sent: ' + info.response);
      }
    }); 
    

}

//module.exports = {mailhandlerpasswordreset,mailhandleremailconfirm};

