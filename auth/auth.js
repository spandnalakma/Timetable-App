const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../models/users');
const UserEModel = require('../models/user_ext');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
    'signup',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          const user = await UserModel.create({ email, password });
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    'login',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          const user = await UserModel.findOne({ email });
  
          if (!user) {
            return done(null, false, { message: 'User not found' });
          }
  
          const validate = await user.isValidPassword(password);
  
          if (!validate) {
            return done(null, false, { message: 'Wrong Password' });
          }
  
          return done(null, user, { message: 'Logged in Successfully' });
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(new GoogleStrategy({
    clientID: "269518045972-ejdbsr1acrt9f62t30ha8k5m4e3i2abk.apps.googleusercontent.com",
    clientSecret: "rHiGrydp-IdpfZGFA-zX_Oyd",
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    //UserEModel.findOrCreate({ googleId: profile.id }, function (err, user) {
      //return cb(err, user);
    //});
    return cb(null, profile);
  }
));



  passport.use(
    new JWTstrategy(
      {
        secretOrKey: 'TOP_SECRET',
        jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
      },
      async (token, done) => {
        try {
          return done(null, token.user);
        } catch (error) {
          done(error);
        }
      }
    )
  );