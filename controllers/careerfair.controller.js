const Careerfair = require('../models/careerfair');
const Student = require('../models/student');
const Interview = require('../models/interview');
const edid = require('../edid/edid');
const crypto = require('crypto');

function getCareerfairs(req, res, next) {

    Careerfair.find((error, careerfairs) => {
        res.json(careerfairs);
    });
}

function getCareerfair(req, res, next) {

    Careerfair.findOne({_id: req.params.id})
    .populate(
        {
            path: 'interviews', 
            model: 'Interview', 
            populate: [{path: 'company', model: 'Company'}, {path: 'student', model: 'Student'}]
            
        })
    .exec((error, careerfair) => {
        
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

    console.log("\n\n ---- updateCompanyList node ", req.body, " \n--")

    if (req.body.enable) { //enable represents company card slide toggle position
        Careerfair.update(
            { _id: req.params._id },
            { $addToSet: { companies: req.body.companyId  } }
        )
        .exec()
        .then(result => {
            console.log("\n ++ updateCompanyList node then " ,result, " ++\n");
            res.status(200).json(result);
        })
        .catch(err => {
            console.log("\n -- updateCompanyList node error ", err, " --\n");
            res.status(500).json({
                error: err
            });
        });
    }
    else {
        Careerfair.update(
            { _id: req.params._id },
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


function addInterview(req, res, next) {

    const passportHash = crypto.createHash('md5').update(req.body.student, 'utf8').digest('hex');

    Student.find({passport: passportHash}, (error, students) => {

        if (error) {
            return res.status(500).json(error);
        }

        if (students.length == 0) {
            saveStudent(req.body.student)
            .then( student => {
                let newInterview = new Interview({
                    company: req.body.company,
                    student: student._id,
                    time: req.body.time
                });

                saveInterview(newInterview, req.params.id)
                .then( result => {
                    return res.status(200).json(result);
                })
                .catch( error => {
                    return res.status(500).json(error);
                })
            })
            .catch( error => {
                return res.status(500).json(error)
            });
        }
        else {

            let newInterview = new Interview({
                company: req.body.company,
                student: students[0]._id,
                time: req.body.time
            });

            saveInterview(newInterview, req.params.id)
            .then( result => {
                return res.status(200).json(result)
            })
            .catch( error => {
                return res.status(500).json(error);
            });
        }
    });
}

async function saveStudent(pid) {

    return new Promise((resolve, reject) => {

        edid.getStudentData(pid)
        .then(studentData => {

            let newStudent = new Student({
                passport: crypto.createHash('md5').update(pid, 'utf8').digest('hex'),
                name: studentData.name,
                major: studentData.major,
                class: studentData.class
            });

            newStudent.save((error, student) => {

                if (error) {
                    reject(error);
                }
    
                if (student) {
                    resolve(student);
                }
            });

        })
        .catch( error => {
            reject(error);
        });        
    });
}

async function saveInterview(newInterview, careerfairId) {

    return new Promise( (resolve, reject) => {

        newInterview.save((error, interview) => {

            if (error) {
                reject(error);
            }

            Careerfair.updateOne({_id: careerfairId}, { $addToSet: {interviews: interview._id} }, (error, result) => {

                if (error) {
                    reject(error);
                }

                console.log(result);

                if (result) {
                    resolve(result);
                }
            })
        });
    });
}

module.exports = {
    getCareerfairs,
    getCareerfair,
    addCareerfair,
    deleteCareerfair,
    updateCompanyList,
    addInterview
}