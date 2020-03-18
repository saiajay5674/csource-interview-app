const express = require('express');
const router = express.Router();

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

module.exports = router;