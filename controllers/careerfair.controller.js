const Careerfair = require('../models/careerfair');

function getCareerfairs(req, res, next) {

    Careerfair.find((error, careerfairs) => {
        res.json(careerfairs);
    });
}

function getCareerfair(req, res, next) {

    Careerfair.findOne({_id: req.params.id}).populate('companies').exec((error, careerfair) => {
        
        if (error) {
            return res.status(500).json(error);
        }
        if (careerfair) {
            return res.status(200).json(careerfair);
        }
    });
}

function addCareerfair(req, res, next) {

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
}

function deleteCareerfair(req, res, next) {

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
}

function updateCompanyList(req, res, next) {

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
}

module.exports = {
    getCareerfairs,
    getCareerfair,
    addCareerfair,
    deleteCareerfair,
    updateCompanyList
}