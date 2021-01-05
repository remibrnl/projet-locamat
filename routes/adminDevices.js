var express = require('express')
var router = express.Router()
var jwt = require('jsonwebtoken')

router.get('/',authenticateToken,(req,res)=>{
    res.render('adminDevices',{ title: 'Locamat : Materiel administration', user: req.user })
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