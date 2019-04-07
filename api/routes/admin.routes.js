const passport = require('passport')


exports.adminLogin =  function(req, res, next) {
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
          console.log(user)
          
          var token = user.generateJWT();
          // res.cookie("jwt", token, { httpOnly: true, secure: true });
          return res.status(200).send(token);
        }
      });
    })(req, res, next);
  }



