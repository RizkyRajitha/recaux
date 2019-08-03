const bcrypt = require("bcryptjs");

const str = "heshan";

const ss = 'aaaaa'

// var salt = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync(str, salt);

// //var status = bcrypt.compareSync("kajini", '$2a$10$sjWvyXaRSCd/LQVZmgfv.uyK9UAoZEJTL17fIOwaW.nwIA51QSYsq');

// var status = bcrypt.compareSync("heshan", '$2a$10$VXhYZH/mXKk7IoRyQau24.x2/DJOx3xZ0uJUztZ7DO2eitysWUBsG');


var st = "http://res.cloudinary.com/dijjqfsto/image/upload/v1557682425/recaux/avatar/5cd661ceac454d73b091b79d.jpg"

console.log(st + '  len - '+st.length)

var preurl = st.slice(0,48)
var posturl = st.slice(49,st.length)
var config = "/w_400/"

console.log('pre url - '+preurl)
console.log('post url - '+posturl)

console.log(preurl+config+posturl)

//console.log(" hash - " + hash + "\nvalid - " + status);
