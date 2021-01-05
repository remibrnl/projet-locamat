const { request } = require('express')
var express = require('express')
var router = express.Router()
var jwt = require('jsonwebtoken')
var users = require('../db/users.js')


/*var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'locamat'
})*/

router.get('/',authenticateToken,(req,res)=>{
  res.render('adminUsers',{ title: 'Locamat : Users administration', user: req.user , postRequest: req.postRequest, searchUser: req.searchUser})
})

router.post('/',authenticateToken,(req,res)=>{
  var postRequest = true
  users.findByID(req.body.id, (err, user) => {
    if (err) {
      throw err
    }
    console.log('POST')
    if(user==null){
      var message = 'wrong user id'
      console.log('user not found')
    }
    else{
      res.render('adminUsers',{title: 'Locamat : Users administration', searchUser: user, message: message, user: req.user, postRequest: postRequest})
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

module.exports = router;