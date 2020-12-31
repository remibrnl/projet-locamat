var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var mysql = require('mysql');

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
    try {
        var hashedPassword = await bcrypt.hash(req.body.password,10);
        connection.query("INSERT INTO userTable(`id`,`lastName`,`firstName`,`mail`,`isAdmin`,`hashedPassword`) VALUES(?,?,?,?,?,?)",[
            req.body.id, 
            req.body.lastName,
            req.body.firstName,
            req.body.mail,
            true,
            hashedPassword    
        ], (err, result) => {
            if(err) {
                next(err)
            }
            console.log(result)
            res.redirect('/login')
        });
    } catch (err) {
        connection.end();
        next(err)
    }
})

module.exports = router;
