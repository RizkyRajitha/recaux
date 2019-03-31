const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "../assets/avatar",
  filename: function(req, file, cb) {
      console.log(req.params.id)
      
      cb(null,req.params.id+path.extname(file.originalname))
  }
});

const upload = multer({storage:storage}).single('avatar')

exports.profileimgup = (req, res) => {

    upload(req,res,(err)=>{

        if(err){
            console.log(err)
        }
        else{
            console.log(req.file)
        }

    })


    console.log('req came avatar')



};
