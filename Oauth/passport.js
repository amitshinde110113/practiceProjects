
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.serializeUser(function (user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
  
  passport.use(new GoogleStrategy({
    clientID: '694456625183-7h494igplprb41o3gc6ijrlnnoh3rpik.apps.googleusercontent.com',
    clientSecret: 'HuI4HUnK5oK_Z1-ytbYQCDeU',
    callbackURL: 'http://localhost:3000/dash'
  },
    function (accessToken, refreshToken, profile, cb) {
      console.log('profile', profile)
      return cb(null, profile);
    }
  ));