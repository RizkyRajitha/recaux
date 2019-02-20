const bcrypt = require("bcryptjs");

const str = "heshan";

var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync(str, salt);

//var status = bcrypt.compareSync("kajini", '$2a$10$sjWvyXaRSCd/LQVZmgfv.uyK9UAoZEJTL17fIOwaW.nwIA51QSYsq');

var status = bcrypt.compareSync("heshan", '$2a$10$VXhYZH/mXKk7IoRyQau24.x2/DJOx3xZ0uJUztZ7DO2eitysWUBsG');


console.log(" hash - " + hash + "\nvalid - " + status);
