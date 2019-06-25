const passport = require("passport");
const localstratergy = require("passport-local").Strategy;
const passJWT = require("passport-jwt");
const JWTstratagy = passJWT.Strategy;
const ExtractJWT = passJWT.ExtractJwt;
const ObjectID = require("mongodb").ObjectID;

const users = require("../db/users");

//module.exports = function(passport){
passport.use(
  "local",
  new localstratergy({ usernameField: "email",session:false }, function(
    email,
    password,
    done
  ) {
    console.log("inside passport");
    console.log(`email -${email} \npass -  ${password}\n`);

    users
      .findOne({ email: email })
      .then(data => {
        if (!data) {
          return done(null, false, { message: "invalid_email" });
        }
        if (data) {
          console.log("user have " + data.email);
          console.log(password);
        }
        if (data.verifypass(password)   ) {

          if(!data.state){
            console.log("active user hari "+data.state);
            return done(null, data);
          }
          else{
            return done(null, false, { message: "disabled_user" });

          }

        
        
        
        } else {
          return done(null, false, { message: "invalid_password" });
        }
      })
      .catch(err => done(err));

    passport.serializeUser(function(user, done) {
      done(null, user);
    });

    passport.deserializeUser(function(user, done) {
      done(null, user);
    });
  })
);

var JJWTExtractor = function(req) {
  var token = null;
  if (req && req.headers.authorization)
  {
      token = req.headers.authorization;
  }
  return token;
};

passport.use(
  "jwtstrategy",
  new JWTstratagy(
    {
      jwtFromRequest: JJWTExtractor,
      secretOrKey: "authdemo",
    },
    (payload, done) => {
      console.log('in jwt passport')
      console.log(payload);

      if(payload===undefined){
        return done(true,"errro",'not a valid user');
      }

      if (Date.now > payload.expiresIn) {
        return done('errro',"expired",'expired');
      }





      return done(null, payload,'valid user');
    }
  )
);


/*


passport.use(
  "jwtstrategy",
  new JWTstratagy(
    {
      jwtFromRequest: JJWTExtractor,
      secretOrKey: "authdemo",
    },
    (payload, done) => {
      console.log('in jwt passport')
      console.log(payload);

      if(payload===undefined){
        return done(true,"errro",'not a valid user');
      }

      if (Date.now > payload.expiresIn) {
        return done('errro',"expired",'expired');
      }
      else{
        console.log('payload - '+payload.id)
        console.log('payload  eemail - '+payload.email)
        users.findById(ObjectID(payload.id)).then((result) => {


          if(result.verifypass()){

          var sentdata = {email :result.email,
          fname:result.firstName,
        lname:result.lastName,
      varifyemail:result.emailverified,
    }

          return done(null, sentdata,'valid user');
          }


          
        }).catch((err) => {
          return done(true,"errro",'incorrect password');
        });

        

       
      }
      
    }
  )
);

*/




// pp.use(
//   new localstratergy(
//     {
//       usernameField: "user[email]",
//       passwordField: "user[password]"
//     },
//     (email, pass, done) => {
//       users
//         .findOne({ email })
//         .then(user => {
//           if (!user || !user.verifypass(pass)) {
//             return done(null, false, {
//               errors: { "email or password": "is invalid" }
//             });
//           }
//           return done(null, user);
//         })
//         .catch(done);
//     }
//   )
// );
