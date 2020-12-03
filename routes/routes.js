const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/users');


router.post('/signup',  async (req,res) => {
    let user = await User.findOne({username:req.body.username});
    if(user){
      return res.status(400).json({message:"user already exists"});
    }

    user = new User(req.body);
    user.save((err)=>{
      if(err){
      console.log(err);
    }
    const token = user.generateJWTToken();
    res.status(200).send({auth:true,token:token});
  });
}
);


router.post('/login',
    async (req, res, next) => {
      passport.authenticate(
        'login', 
        async (err, user, info) => {
          try {
            if (err || !user) {
              const error = new Error('An error occurred.');
  
              return next(error);
            }
  
            req.login(
              user,
              { session: false },
              async (error) => {
                if (error) return next(error);
  
                const token = user.generateJWTToken();

                const responseObject = {
                  userName: user.username,
                  token: token,
                  expiresIn:86400
                };
  
                return res.json({ responseObject });
              }
            );
          } catch (error) {
            return next(error);
          }
        }
      )(req, res, next);
    }
  );


  router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

  router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });


module.exports = router;

