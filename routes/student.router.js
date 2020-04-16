const express = require('express');
const router = express.Router();
const edid = require('../edid/edid');

router.get('/:id', (req, res, next) => {

    console.log(`LOG: GET REQUEST STUDENT ID: ${req.params.id}`);
    edid.getStudentData(req.params.id).then( result => {
        console.log('')
        return res.status(200).json(result);
    })
    .catch( error => {
        return res.status(500).json(error);
    })
});

module.exports = router;