const LocalStrategy = require('passport-local').Strategy;
const User = require('./user');

//passport save the information of the user using cookies
module.exports = function (passport) {
   passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  // Signup
  passport.use('local-signup', new LocalStrategy({      
    usernameField: 'email',    
    passwordField: 'password',
    passReqToCallback : true 
  },
  function (req, email, password, done) {
    User.findOne({'local.email': email}, function (err, user) {
      if (err) {   // sends error msj
        return done(err);
      }
      if (user) {   // user exist
        return done(null, false, req.flash('signupMessage', 'the nickname is already taken'));
      } else {  // create new User
        var newUser = new User();
        newUser.local.email = email;
        newUser.local.nickname = req.param('username');
        newUser.local.password = newUser.generateHash(password);    // use a function created in user.js
        newUser.save(function (err) {
          if (err) { throw err; }
          return done(null, newUser); //return new user
        });
      }
    });
  }));

  // login
  passport.use('local-login', new LocalStrategy({
    usernameField: 'nickname',
    passwordField: 'password',
    passReqToCallback: true
  },
  function (req, nickname, password, done) {
    User.findOne({'local.nickname': nickname}, function (err, user) {
      if (err) { return done(err); }
      if (!user) {    //doesn't exist user
        return done(null, false, req.flash('loginMessage', 'No user found'))
      }
      if (!user.validPassword(password)) {   // use a function created in user.js
        return done(null, false, req.flash('loginMessage', 'Wrong password'));
      }
      return done(null, user);
    });
  }));
}