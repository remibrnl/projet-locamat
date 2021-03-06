require('dotenv').config();

var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var mysql = require('mysql');
var bcrypt = require('bcrypt');

var users = require('../db/users.js')


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

router.post('/', (req, res, next) => {
  
  users.findByEmail(req.body.mail, (err, user) => {
    if (err) {
      res.render('register',{ message: 'You have to register first' }); 
    }

    if (user === null) {
      res.render('register',{ message: 'You have to register first' }); 
    }

    bcrypt.compare(req.body.password,user.hashedPassword)
    .then( (check) => {

      if (check) {
        const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET);
        res.cookie('token',accessToken.toString());
        res.redirect('/');
      }
      else {
        res.render('login',{message: 'Wrong password'});
      }

    })
    .catch((err) => {
      next(err);
    });


  });

});

module.exports = router;