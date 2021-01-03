require('dotenv').config();

var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var mysql = require('mysql');
var bcrypt = require('bcrypt');

var user = require('../db/users.js')


var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'locamat'
})

/* GET home page. */
router.get('/', async(req, res) =>{
  res.render('login', { title: 'Locamat : Login', message: req.message});
});

router.post('/',(req, res, next) => {
  
  connection.query("SELECT * FROM userTable WHERE mail = ? ", [req.body.mail], async(err,result) => {
    console.log(result)
    if(err) {
      next(err)
    }

    if(result[0] === undefined) {
      res.render('register',{ message: 'You have to register first' }); 
    }

    var user = {
      id: result[0].id,
      lastName: result[0].lastName, 
      firstName: result[0].firstName,
      mail: result[0].mail, 
      isAdmin: result[0].isAdmin, 
      password: result[0].hashedPassword
    }

    try { 
      if(await bcrypt.compare(req.body.password,user.password)){
        const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET);
        res.cookie('token',accessToken.toString())
        res.redirect('/')
      } else {
        res.render('login',{message: 'Wrong password'})
      }
    } catch (err) {
      next(err)
    }
  });

})

module.exports = router;