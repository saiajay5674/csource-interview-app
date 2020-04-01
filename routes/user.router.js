const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 12;

const secret = "thisisthesecretforjwt" //switch to environment variable

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
                    role: req.body.role,
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

        bcrypt.compare(req.body.password, users[0].password, (error, result) => {

            if (result) {

                jwt.sign({username: users[0].username, role: users[0].role}, secret, (error, token) => {

                    if (error) {
                        return res.status(500).json({msg: 'JWT token failed ' + error});
                    }

                    return res.status(200).json({user: users[0].username, role: users[0].role,  token: token});
                });
            }
            else {
                return res.status(401).json({message: 'Auth Failed'});
            }
        });
    });
});


module.exports = router;