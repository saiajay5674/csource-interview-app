const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 12;

const secret = "thisisthesecretforjwt" //switch to environment variable

const User = require('../models/user');

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