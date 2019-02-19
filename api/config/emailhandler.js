
var nodemailer = require('nodemailer');
const api = 'http://localhost:3000/resetpassword';

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kithminiatdev@gmail.com',
    pass: 'ujotwkdnwgilpkcu'
  }
});


const mailhandler =(email,id)=>{


    var mailOptions = {
        from: 'kithminiatdev@gmail.com',
        to: 'rajithagunathilake@gmail.com',
        subject: 'password reset',
        text: 'visit - ',
        html:`<h1> please visit -${api}/${id}  to reset your password </h1>`
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

module.exports = mailhandler;

