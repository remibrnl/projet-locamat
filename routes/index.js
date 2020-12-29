require('dotenv').config();

var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', authenticateToken, (req, res) =>{
  res.render('index', { title: 'Express' , name: req.user.firstName});
});

function authenticateToken(req,res,next){
  const cookieToken = req.cookies; 
  const token = cookieToken.token; 
  if(token == null) return res.sendStatus(401) ; 

  jwt.verify(token.toString(), process.env.ACCESS_TOKEN_SECRET,(err,user) =>{
      if(err){
        console.log(err);
        return res.sendStatus(403) ;
      }  
      req.user = user ;  
      next();
  })
}
module.exports = router;