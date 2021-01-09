var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

const users = require('../db/users');

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

        var message = users.checkValues(user,(message)=>{
            if(message != undefined){
                users.create(user, (err) => {
                    if (err) {
                        next(err);
                        return;
                    }
        
                    res.redirect('/login');
                })
            }
            res.render('register', { title: 'Locamat : Register', message: message});
        })
        
    })
    .catch((err) => {
        next(err);
    });

})

module.exports = router;
