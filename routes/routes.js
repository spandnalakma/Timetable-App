const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/users');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const emailverify = require('../models/email-verification');



router.post('/signup',  async (req,res) => {
    let user = await User.findOne({username:req.body.username});
    let useremail = await User.findOne({"email":req.body.email});
    if(user || useremail){
      console.log("user already exists");
      return res.status(404).json({"errorMessage":"user already exists"});
    }

    user = new User(req.body);
    let savedUser = await user.save();
     
    generatedtoken = crypto.randomBytes(16).toString('hex');
    var verify_token = new emailverify({email:user.email,token:generatedtoken});
    let tokenModel = await verify_token.save();
    let host = req.get('host');
    //host = 'localhost:3000';  // comment later
    let verifyLink ='http://'+host+'/api/verifyemail?email='+user.email +'&token='+generatedtoken;

    
    var draftMail = { to: user.email, subject: 'Account Verification - Please click on following link', link: verifyLink };

    //const token = user.generateJWTToken();
    res.status(200).send({draftMail:draftMail, email:user.email,token:generatedtoken});
}
);

router.get('/verifyemail', async (req,res)=>{
    let token = req.query.token;
    let email = req.query.email;
    let user = await User.findOne({"email":email});

    if(!user){
      res.status(404).json({"errorMessage":"email does not exist"});
    }
    if(user.isVerified){
      res.status(404).json({"errorMessage":"This email is already verified"});
    }
    let verifyToken = await emailverify.findOne({"email":email});
    if(!verifyToken){
      res.status(404).json({"errorMessage":"Email does not match"});
    }
    if(verifyToken.token != token){
      res.status(404).json({"errorMessage":"Token is not verified"});
    }
    let host = req.get('host');
    
    let updated_user = await User.findOneAndUpdate({"email":email},{isVerified: true});
    
    res.json("Email verification successful");
})


router.post('/login',
    async (req, res, next) => {
      passport.authenticate(
        'login', 
        async (err, user, info) => {
          try {
            if (err || !user) {
              //const error = new Error('An error occurred.');
              if(err){
              console.log(err);
               return res.status(404).json({"errorMessage":"login unsuccessful"});
              }
              if(!user){
                return res.status(404).json({"errorMessage":info.message});
              }
              //return next(error);
            }
  
            req.login(
              user,
              { session: false },
              async (error) => {
                if (error) {
                  return res.status(404).json({"errorMessage":"login error"})
                  //return next(error);
                }

                if(!user.isVerified){
                  let host = req.get('host');
                  let vrfy = await emailverify.findOne({"email":user.email});
                  console.log(vrfy);
                  if(vrfy.token){
                    let verifyLink ='http://'+host+'/api/verifyemail?email='+user.email +'&token='+vrfy.token;
                    return res.json({"message":`Please copy paste the link in browser to verify your account - ${verifyLink}`})
                  }
                  return res.status(404).json({"errorMessage":"User not registred"})
                }
  
                const token = user.generateJWTToken();

                const responseObject = {
                  userName: user.username,
                  isAdmin:user.isAdmin,
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


/*   router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

  router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }); */

  router.get('/google/:name',(req,res)=>{
    let name = req.params.name;
     let user = new User({"username":name, "isAdmin":false});
     let token = user.generateJWTToken();
     const responseObject = {
      userName: user.username,
      isAdmin:user.isAdmin,
      token: token,
      expiresIn:86400
    };

    return res.json({ responseObject });
  })


module.exports = router;

