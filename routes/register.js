var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var mysql = require('mysql');
const users = require('../db/users');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'locamat'
})


router.get('/', (req,res)=>{
    res.render('register', { title: 'Locamat : Register', message: req.message});
})

router.post('/', async(req, res, next)=>{
    
    bcrypt.hash(req.body.password,10)
    .then((hashedPassword) => {
        var user = {
            id: req.body.id,
            lastName: req.body.lastName,
            firstName: req.body.firstName,
            mail: req.body.mail,
            isAdmin: false,
            hashedPassword: hashedPassword
        };

        if (req.body.isAdmin !== undefined) user.isAdmin = true;

        users.create(user, (err) => {
            if (err) {
                next(err);
                return;
            }

            res.redirect('/login');
        })

    })
    .catch((err) => {
        next(err);
    });

})

module.exports = router;
