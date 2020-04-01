const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 12;

const User = require('../models/user');

//Create new user
router.post('/create', (req, res, next) => {

    User.find({username: req.body.username}).exec()
    .then( users => {
        if (users.length > 0) {
            res.status(409).json({ msg: 'User Exists'})
        }
        else {

            bcrypt.hash(req.body.password, SALT_ROUNDS, (error, hash) => {
                
                if (error) {
                    return res.status(500).json({error})
                }
                
                let newUser = new User({
                    username: req.body.username,
                    password: hash
                });
                
                newUser.save((error, user) => {
        
                    if (error) {
                        res.status(500).json({msg: 'Failed to add user ' + error});
                    }
                    else {
                        res.status(201).json({msg: 'New user has been added', user});
                    }
                });
        
            }); 
        }
    });
   
});

router.post('/login', (req, res, next) => {
    
    User.find({username: req.body.username}).exec()
    .then( users => {

        if (users.length < 1) {
            return res.status(401).json({message: 'Auth Failed'});
        }

        bcrypt.compare(req.body.password, user[0].password, (error, result) => {

            if (result) {

                jwt.sign({username: user[0].username}, process.env.JWT_SECRET, (error, token) => {

                    return res.status(200).json({user: user[0].username, token: token});
                });
            }

            return res.status(401).json({message: 'Auth Failed'});
        });
    });
});


module.exports = router;