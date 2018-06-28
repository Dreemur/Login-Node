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
    User.findOne({'local.username': email}, function (err, user) {
      if (err) {   // sends error msj
        return done(err);
      }
      if (user) {   // user exist
        return done(null, false, req.flash('signupMessage', 'the username is already taken'));
      } else {  // create new User
        var newUser = new User();
        newUser.local.email = email;
        // newUser.local.username = user;
        newUser.local.password = newUser.generateHash(password);    // use function create in user.js
        newUser.save(function (err) {
          if (err) { throw err; }
          return done(null, newUser);
        });
      }
    });
  }));

  // login
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function (req, email, password, done) {
    User.findOne({'local.email': email}, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, req.flash('loginMessage', 'No User found'))
      }
      if (!user.validPassword(password)) {
        return done(null, false, req.flash('loginMessage', 'Wrong. password'));
      }
      return done(null, user);
    });
  }));
}