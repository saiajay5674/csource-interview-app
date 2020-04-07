const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Careerfair = require('../models/careerfair');


//Get ALL career fairs
router.get('/', (req, res, next) => {

    Careerfair.find((error, careerfairs) => {
        res.json(careerfairs);
    });
});

//Create new career fair
router.post('/', (req, res, next) => {

    let newCareerfair = new Careerfair({
        term: req.body.term,
        year: req.body.year
    });

    newCareerfair.save((error, careerfair) => {

        if (error) {
            res.json({msg: 'Failed to add careerfair ' + error});
        }
        else {
            res.json({msg: 'New careerfair has been added'});
        }
    });
});

//Delete a career fair
router.delete('/:id', (req, res, next) => {

    console.log(req.params);

    Careerfair.remove({_id: req.params.id}, (error, result) => {
        if (error) {
            console.log('Error')
            res.json(error);
        }
        else {
            res.json(result);
        }
    });
});

//Update number of companies at a careerfair
router.patch('/:id', (req, res, next) => {

    if (req.body.enable) { //enable represents company card slide toggle position
        Careerfair.update(
            { _id: req.params.id },
            { $addToSet: { companies: req.body.companyId  } }
        )
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    }
    else {
        Careerfair.update(
            { _id: req.params.id },
            { $pull: { companies: req.body.companyId  } }
        )
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    }
    
});

module.exports = router;