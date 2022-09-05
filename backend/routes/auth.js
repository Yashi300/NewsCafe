const express = require("express");
const Router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = "it'ssecrettime";

//ROUTE 1 : NO SIGNIN REQUIRED.ONLY CREATE USER  POST:/api/auth/createuser
Router.post('/createuser',[
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must have alteast 8 characters').isLength({ min: 8 })
],async (req, res)=>{
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    try {
       let user =await User.findOne({email : req.body.email});
      if(user){
        return res.status(404).json({success,error : "Sorry a user with this name already exists"})
      }

      const salt =await bcrypt.genSalt(10);
      const secPass =await bcrypt.hash(req.body.password, salt);
      //CREATE A NEW USER
    user = await  User.create({
          name: req.body.name,
          password: secPass,
          email:req.body.email
        })
        const data = {
          user : {
            id : user.id
          }
        }
        const authtoken = jwt.sign(data , JWT_SECRET);
        console.log(authtoken);

        success = true;
        res.json({success, authtoken});
        // res.json(user)

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured")
    }
})


//ROUTE 2 : NO SIGNIN REQUIRED.ONLY AUTHENTICATE USER  POST:/api/auth/login
Router.post('/login',[
  body('email','Enter a valid email').isEmail(),
  body('password','password can not be blank').exists()
],async (req, res)=>{
  let success= false;
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    const {email,password} = req.body;
    try {
      let user =await User.findOne({email});
      if(!user){
        return res.status(400).json({success, error : "Please try and login with correct creditals."})
      }
      const passwordcompare =await bcrypt.compare(password, user.password)
      if(!passwordcompare){
        return res.status(400).json({error : "Please try and login with correct creditals."})
      }

      const data = {
        user : {
          id : user.id
        }
      }
      const authtoken = jwt.sign(data , JWT_SECRET);
      console.log(authtoken);
      success = true;
      res.json({success, authtoken});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured")
    }
})

//ROUTE 3 : Get loggedin user details using POST:/api/auth/getuser . Login required
Router.post('/getuser',fetchuser ,async (req, res)=>{
  try {
   userId=req.user.id;
    const user =await User.findById(userId).select("-password");
    res.send(user)
  }  catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured")
  }
})
module.exports = Router