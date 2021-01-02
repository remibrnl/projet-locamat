var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var jwt = require('jsonwebtoken')

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
    
            //res.user = user
            res.render('profile',{title: 'Locamat : User profile', user: user})
        }
        
    })
})

router.post('/',(req,res)=>{
    var user = {
        name: req.body.firstName,
        lastName: req.body.lastName,
        mail: req.body.mail
    }
    console.log(user)
    res.json(user)
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