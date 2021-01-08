const { request } = require('express');
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var users = require('../db/users.js');
var devices = require('../db/devices.js');

router.get('/',authenticateToken,(req,res)=>{
  users.findAll((err, userList) => {
    if (err) {
      next(err);
      return;
    }
    else{
      res.render('adminUsers',{ title: 'Locamat : Users administration', connectedUser: req.user , searchUser: req.searchUser, userList: userList, message:'', devicesList: req.devicesList})
    }
  })
})

router.post('/',authenticateToken,(req,res)=>{

  var devicesList = [];

  users.findAll((err, userList) => {
    if (err) {
      next(err);
      return;
    }
  
    if(req.body.id == '') {
      res.render('adminUsers',{title: 'Locamat : Users administration', searchUser: req.searchUser, message: '', connectedUser: req.user, userList: userList, devicesList: devicesList})
    }
    else{

      users.findByID(req.body.id, (err, user) => {
        if (err) {
          var message = 'wrong user id'
          res.render('adminUsers',{title: 'Locamat : Users administration', searchUser: undefined, message: message, connectedUser: req.user, userList: userList , devicesList: devicesList})
        }
        else{
          devices.findByUser(req.body.id,(err,result)=>{
            if(err) {
              next(err);
              return
            }
            res.render('adminUsers',{title: 'Locamat : Users administration', searchUser: user, message: message, connectedUser: req.user, userList: userList, devicesList: result})
          })
        }
      })
    }
  })
})


function authenticateToken(req, res, next) { 
  const cookieToken = req.cookies 
  const token = cookieToken.token
  
  if(token == null || token=="") { return res.redirect('login')} 
  else{
    jwt.verify(token.toString(), process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err){
        res.redirect('/login', {message: 'invalid token'})
      }
      
      else if (!decoded) {
        res.redirect('/login', {message: 'invalid token'})
      }
      else {
        req.user = decoded
        next()
      }
    })
  }
}

module.exports = router 