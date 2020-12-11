const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../models/users');
const UserEModel = require('../models/user_ext');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
var GoogleStrategy = require('passport-google-oauth20').Strategy;

/* passport.use(
    'signup',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      async (req, email, password, done) => {
        try {
          const username = req.body.username;
          const user = await UserModel.create({ email, password, username });
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  ); */

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

          console.log(user);
  
          if (!user) {
            return done(null, false, { message: 'User not found' });
          }

          if(user.deactivated){
            return done(null, false, {message: 'Account is disabled. Please contact admin to resolve'})
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

 /*  passport.serializeUser((user,done)=>{
    done(null,user.id);
  })

  passport.deserializeUser((id,done)=>{
    UserEModel.findById(id).then((user)=>{
      done(null,user);
    });
  }); */

  /* passport.use(new GoogleStrategy({
    clientID: "269518045972-ejdbsr1acrt9f62t30ha8k5m4e3i2abk.apps.googleusercontent.com",
    clientSecret: "rHiGrydp-IdpfZGFA-zX_Oyd",
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    UserEModel.findOne({ googleId: profile.id }).then((currentUser)=>{
      if(currentUser){
        console.log(`user is ${currentUser}`);
        done(null,currentUser);
      }else{
        new UserEModel({
          googleId:profile.id,
          username:profile.displayName
        }).save().then((newUser)=>{
          console.log(`created user ${newUser}`);
          done(null,newUser);
        });
      }
    })
  }
)); */



  /* passport.use(
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
  );*/