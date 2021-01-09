var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var bcrypt = require('bcrypt')

var users = require('../db/users')
var authenticateToken = require('../routes/authenticateToken.js');

router.get('/',authenticateToken,(req,res) =>{
    users.findByID(req.user.id,(err,result)=>{
      if(err){
        next(err)
        return 
      }
        console.log(result)
        if(result == null){
            res.sendStatus(404)    
        }
        else{
            var user = {
                id: result.id,
                lastName: result.lastName, 
                firstName: result.firstName,
                mail: result.mail,
                isAdmin: result.isAdmin
            }
    
            res.render('profile',{title: 'Locamat : User profile', user: result, message: req.message})
        }
        
    })
})

router.post('/updateUser',authenticateToken,(req,res,next)=>{

 if(req.body.firstName != '') var firstName = req.body.firstName 
  else var firstName = req.user.firstName
  if(req.body.lastName != '') var lastName = req.body.lastName
  else var lastName = req.user.lastName
  if(req.body.mail != '') var mail = req.body.mail
  else var mail = req.user.mail
  var user = {
    id: req.user.id,
    firstName: firstName,
    lastName: lastName,
    mail: mail, 
    isAdmin: req.user.isAdmin,
    hashedPassword: req.user.hashedPassword
  }
  users.checkValues(user,(result)=>{
    if(result != undefined){
      res.setHeader('message' , result.message)
      res.redirect('/profile')
    }
    else{
      users.update(user,(err,result)=>{
        if(err){
          next(err)
          return
        }
        res.redirect('/profile')
      })
    }
  })
})

router.post('/passwordChange',authenticateToken, async(req,res)=>{
  if(await bcrypt.compare(req.body.formerPassword,req.user.password)){
    var newHashedPassword = await bcrypt.hash(req.body.newPassword,10)
    var user = {
      id: req.user.id,
      firstName: firstName,
      lastName: lastName,
      mail: mail, 
      isAdmin: req.user.isAdmin,
      hashedPassword: newHashedPassword
    }
    users.checkValues(user,(err,result)=>{
      users.update(user,(err,result)=>{
        if(result == null){
          console.log(result)
          res.sendStatus(404)    
        }
        else{
          res.redirect('/profile')
        }
      })
    })
  }
  else{
    res.redirect('/profile')
  }
})

module.exports = router 