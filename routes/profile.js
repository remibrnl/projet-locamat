var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var bcrypt = require('bcrypt')

var authenticateToken = require('../routes/authenticateToken.js');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'locamat'
})

router.get('/',authenticateToken,(req,res) =>{
    connection.query("SELECT * FROM userTable where id = ?",[req.user.id],(err,result)=>{
        console.log(result)
        var user = {
            id: -1, 
            lastName: "last name",
            firstName: "first name",
            mail: "mail@mail.com"
        }
        if(result == null){
            res.sendStatus(404)    
        }
        else{
            var user = {
                id: result[0].id,
                lastName: result[0].lastName, 
                firstName: result[0].firstName,
                mail: result[0].mail,
                isAdmin: result[0].isAdmin
            }
    
            res.render('profile',{title: 'Locamat : User profile', user: user})
        }
        
    })
})

router.post('/updateUser',authenticateToken,(req,res)=>{
  if(req.body.firstName != '') var firstName = req.body.firstName 
  else var firstName = req.user.firstName
  if(req.body.lastName != '') var lastName = req.body.lastName
  else var lastName = req.user.lastName
  if(req.body.mail != '') var mail = req.body.mail
  else var mail = req.user.mail
  connection.query("UPDATE usertable SET firstName = ? , lastName = ? , mail = ?  WHERE id = ? ; ", [firstName,lastName,mail,req.user.id],(err,result)=>{
    if(result == null){
      console.log(result)
      res.sendStatus(404)    
    }
    else{
      res.redirect('/profile')
    }
  })
})

router.post('/passwordChange',authenticateToken, async(req,res)=>{
  console.log(req.user.id)
  if(await bcrypt.compare(req.body.formerPassword,req.user.password)){
    var newHashedPassword = await bcrypt.hash(req.body.newPassword,10)
    connection.query("UPDATE usertable SET hashedPassword = ? WHERE id = ? ; ", [newHashedPassword,req.user.id],(err,result)=>{
      if(result == null){
        console.log(result)
        res.sendStatus(404)    
      }
      else{
        res.redirect('/profile')
      }
    })
  }
})

module.exports = router 