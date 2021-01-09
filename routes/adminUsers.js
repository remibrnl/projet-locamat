var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt')

var users = require('../db/users.js');
var devices = require('../db/devices.js');
var authenticateToken = require('../routes/authenticateToken.js');


router.get('/',authenticateToken,(req,res,next)=>{
  users.findAll((err, userList) => {
    if (err) {
      next(err);
      return;
    }
    else{
      console.log(req.user)
      res.render('adminUsers',{ title: 'Locamat : Users administration', connectedUser: req.user , searchUser: req.searchUser, userList: userList, message:'', devicesList: req.devicesList})
    }
  })
})

router.post('/',authenticateToken,(req,res,next)=>{
  res.cookie('searchID',req.body.searchId)
  var devicesList = [];

  users.findAll((err, userList) => {
    if (err) {
      next(err);
      return;
    }
  
    if(req.body.searchId == '') {
      res.render('adminUsers',{title: 'Locamat : Users administration', searchUser: req.searchUser, message: '', connectedUser: req.user, userList: userList, devicesList: devicesList})
    }
    else{

      users.findByID(req.body.searchId, (err, user) => {
        if (err) {
          var message = 'wrong user id'
          res.render('adminUsers',{title: 'Locamat : Users administration', searchUser: undefined, message: message, connectedUser: req.user, userList: userList , devicesList: devicesList})
        }
        else{
          devices.findByUser(req.body.searchId,(err,result)=>{
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

router.post('/userModify',authenticateToken,async(req,res,next)=>{
  bcrypt.hash(req.body.password,10)
  .then((hashedPassword) => {
    var updateUser ={
      id: req.user.id,
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      mail: req.body.mail,
      isAdmin: false,
      hashedPassword: hashedPassword
    }
    if (req.body.isAdminModify !== undefined) updateUser.isAdmin = true;

    users.update(updateUser,(err,result)=>{
      if(err){
        next(err)
        return
      }
      res.redirect('/adminUsers')
    })
  })
})

router.post('deleteUser',authenticateToken,(req,res)=>{
  res.redirect('/')
})

router.post('/createUser',authenticateToken,(req,res,next)=>{
  bcrypt.hash(req.body.password,10)
  .then((hashedPassword) => {
    var updateUser ={
      id: req.body.id,
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      mail: req.body.mail,
      isAdmin: false,
      hashedPassword: hashedPassword
    }
    if (req.body.isAdmin != undefined) updateUser.isAdmin = true;

    users.create(updateUser,(err,result)=>{
      if(err){
        next(err)
        return
      }
      res.redirect('/adminUsers')
    })
  })
})

router.post('/deleteUser',(req,res,next)=>{
  console.log('POST',req.body.searchUser) 
  users.findByID(req.body.searchUser, (err, user) => {
    if(err){
      next(err);
      return
    }
    users.remove(user,(err,result)=>{
      res.redirect('/adminUsers')
    })
  })
})


module.exports = router 