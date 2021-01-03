require('dotenv').config();

var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', authenticateToken, (req, res) =>{
  res.render('index', { title: 'Matériel' , user: req.user});
});

// A FAIRE : Trouver un moyen de rediriger sur /login quand / donne "Unauthorized" --> fait à check ensemble 
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