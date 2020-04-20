const Careerfair = require("../models/careerfair");
const Student = require("../models/student");
const Interview = require("../models/interview");
const Company = require("../models/company");
const edid = require("../edid/edid");
const crypto = require("crypto");

function getCareerfairs(req, res, next) {

  Careerfair.find((error, careerfairs) => {
    res.json(careerfairs);
  });
}

function getCareerfair(req, res, next) {
  Careerfair.findOne({ _id: req.params.id })
    .populate([
      {
        path: "interviews",
        model: "Interview",
        populate: [
          { path: "company", model: "Company" },
          { path: "student", model: "Student" },
        ],
      },
      {
        path: "companies",
        model: "Company",
      },
      {
        path: "students",
        model: "Student",
      },
    ])
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
  Careerfair.find().count((error, count) => {
    if (error) {
      return res.status(500).json(error);
    }

    let currentFair = false;

    if (count == 0) {
      currentFair = true;
    }

    let newCareerfair = new Careerfair({
      term: req.body.term,
      year: req.body.year,
      current: currentFair,
    });

    newCareerfair.save((error, careerfair) => {
      if (error) {
        res.json({ msg: "Failed to add careerfair " + error, error });
      } else {
        res.json({ msg: "New careerfair has been added" });
      }
    });
  });
}

function deleteCareerfair(req, res, next) {
  console.log(req.params);

  Careerfair.remove({ _id: req.params.id }, (error, result) => {
    if (error) {
      console.log("Error");
      res.json(error);
    } else {
      res.json(result);
    }
  });
}

function updateCompanyList(req, res, next) {
  //TODO don't need params??

  console.log("\n\n ---- updateCompanyList node ", req.body, " \n--");

  if (req.body.enable) {
    //enable represents company card slide toggle position
    Careerfair.update(
      { _id: req.body._id },
      { $addToSet: { companies: req.body.companyId } }
    )
      .exec()
      .then((result) => {
        console.log(
          "\n ++ updateCompanyList node activate then ",
          result,
          " ++\n"
        );

        if (result.nModified > 0) {
          Company.findById(req.body.companyId)
            .then((record) => {
              res.json(record);
              console.log("\n\n ###### getCompanyById node  ", record, " **\n");
            })
            .catch((err) => {
              next(err);
            });
        }
        //res.status(200).json(result);
      })
      .catch((err) => {
        console.log("\n -- updateCompanyList node error ", err, " --\n");
        res.status(500).json({
          error: err,
        });
      });
  } else {
    console.log(
      "\n\n ###### getCompanyById node deactivate  ",
      req.body,
      " **\n"
    );
    Careerfair.update(
      { _id: req.body._id },
      { $pull: { companies: req.body.companyId } }
    )
      .exec()
      .then((result) => {
        console.log("\n\n $$$$$ pull log ", result, " $$$\n\n");

        if (result.nModified > 0) {
          Company.findById(req.body.companyId)
            .then((record) => {
              res.json(record);
              console.log("\n\n  getCompanyById node  remove", record, " **\n");
            })
            .catch((err) => {
              next(err);
            });
        }

        //res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  }
}


async function addInterview2(req, res, next) {

  const passportHash = crypto.createHash("md5").update(req.body.student, "utf8").digest("hex");

  const students = await Student.find({passport: passportHash});

  if (students.length == 0) {

  }

}

function addInterview(req, res, next) {
  const passportHash = crypto
    .createHash("md5")
    .update(req.body.student, "utf8")
    .digest("hex");

  Student.find({ passport: passportHash }, (error, students) => {
    if (error) {
      return res.status(500).json(error);
    }

    if (students.length == 0) {
      saveStudent(req.body.student, req.params.id)
        .then((student) => {
          let newInterview = new Interview({
            company: req.body.company,
            student: student._id,
            time: req.body.time,
          });

          saveInterview(newInterview, req.params.id)
            .then((result) => {
              return res.status(200).json(result);
            })
            .catch((error) => {
              return res.status(500).json(error);
            });
        })
        .catch((error) => {
          return res.status(500).json(error);
        });
    } 
    else {

      console.log(students);
      let newInterview = new Interview({
        company: req.body.company,
        student: students[0]._id,
        time: req.body.time,
      });

      Careerfair.updateOne(
      { _id: req.params.id },
      { $addToSet: { students: students[0]._id } },
      (error, result) => {
        if (error) {
          reject(error);
        }

        saveInterview(newInterview, req.params.id)
        .then((result) => {
          return res.status(200).json(result);
        })
        .catch((error) => {
          return res.status(500).json(error);
        });

      });      
    }
  });
}

async function saveStudent(pid, careerfairId) {
  return new Promise((resolve, reject) => {
    edid
      .getStudentData(pid)
      .then((studentData) => {
        let newStudent = new Student({
          passport: crypto.createHash("md5").update(pid, "utf8").digest("hex"),
          name: studentData.name,
          major: studentData.major,
          class: studentData.class,
        });

        newStudent.save((error, student) => {
          if (error) {
            reject(error);
          }

          Careerfair.updateOne(
            { _id: careerfairId },
            { $addToSet: { students: student._id } },
            (error, result) => {
              if (error) {
                reject(error);
              }

              if (result) {
                resolve(student);
              }
            }
          );
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

async function saveInterview(newInterview, careerfairId) {

  return new Promise((resolve, reject) => {
    newInterview.save((error, interview) => {
      if (error) {
        reject(error);
      }

      Careerfair.updateOne(
        { _id: careerfairId },
        { $addToSet: { interviews: interview._id } },
        (error, result) => {
          if (error) {
            reject(error);
          }

          console.log(result);

          if (result) {
            resolve(result);
          }
        }
      );
    });
  });
}

function setCurrent(req, res, next) {
  Careerfair.update(
    { current: true },
    { $set: { current: false } },
    (error, result) => {
      if (error) {
        return res.status(500).json(error);
      }

      Careerfair.update(
        { _id: req.params.id },
        { $set: { current: true } },
        (error, result) => {
          if (error) {
            return res.status(500).json(error);
          }

          return res.status(200).json(result);
        }
      );
    }
  );
}

function getCurrentPopulated(req, res, next) {

  Careerfair.findOne({ current: true })
  .populate([
    {
      path: "interviews",
      model: "Interview",
      populate: [
        { path: "company", model: "Company" },
        { path: "student", model: "Student" },
      ],
    },
    {
      path: "companies",
      model: "Company",
    },
    {
      path: "students",
      model: "Student",
    },
  ])
  .exec((error, careerfair) => {

    if (error) {
      return res.status(500).json(error);
    }

    return res.status(200).json(careerfair);
  });
}


function getCurrentInterviews(req, res, next) {

  console.log('LOG: GET REQUEST | CAREERFAIR CURRENT | ' + req.params.id);
  Careerfair.findOne({current: true})
  .populate(
    {
      path: "interviews",
      model: "Interview",
      populate: [
        { path: "company", model: "Company" },
        { path: "student", model: "Student" }
      ],
    })
  .exec((error, careerfair) => {

    if (error) {
      return res.status(500).json(error);
    }

    console.log('LOG: GET REQUEST SUCCESS');
    return res.status(200).json(careerfair);

  });
}

function getCurrent(req, res, next) {

  Careerfair.findOne({ current: true })
  .populate({path: 'companies', model: 'Company'})
  .exec((error, careerfair) => {
    
    if (error) {
      return res.status(500).json(error);
    }

    return res.status(200).json(careerfair);
  });
}

module.exports = {
  getCareerfairs,
  getCareerfair,
  addCareerfair,
  deleteCareerfair,
  updateCompanyList,
  addInterview,
  setCurrent,
  getCurrent,
  getCurrentPopulated,
  getCurrentInterviews
};
