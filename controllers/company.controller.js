const Company = require("../models/company");
const User = require("../models/user");
const generatePassword = require("password-generator");

function getCompanies(req, res, next) {
  Company.find()
    .populate("companyUser")
    .exec((error, companies) => {
      return res.status(200).json(companies);
    });
}

function addCompany(req, res, next) {
  console.log("Received POST request");
  console.log(req.body);

  let companyUser = new User({
    username: getCompanyUsername(req.body.domain),
    password: getCompanyPassword(),
    role: "Company",
  });

  companyUser.save((err, user) => {
    if (err) {
      return res
        .status(501)
        .json({ msg: "Error while saving company user", err });
    }

    let newCompany = new Company({
      name: req.body.name,
      domain: req.body.domain,
      companyUser: user._id,
    });

    newCompany.save((error, company) => {
      if (error) {
        res.json({ msg: "Failed to add company " + error });
      } else {
        res.json({ msg: "New company has been added", company });
      }
    });
  });
}

function deleteCompany(req, res, next) {
  var removeUser = false;
  var removeCompany = false;

  Company.findOne({ _id: req.params.id }, (error, company) => {
    if (error) {
      return res.status(500).json(error);
    }

    console.log(company);

    User.deleteOne({ _id: company.companyUser }, (error, result) => {
      if (error) {
        return res.status(500).json(error);
      }

      Company.deleteOne({ _id: req.params.id }, (error, result) => {
        if (error) {
          return res.status(500).json(error);
        }

        return res
          .status(200)
          .json({ msg: "Company Data has been deleted", result });
      });
    });
  });
}

function getCompanyById(req, res, next) {
  Company.findById(req.params.id)
    .then((record) => {
      console.log("\n\n *** getCompanyById node  ", req.body, " **\n");
      res.json(record);
    })
    .catch((err) => {
      next(err);
    });
}

function getCompanyUsername(domain) {
  return domain.split(".")[0];
}

function getCompanyPassword() {
  return generatePassword(12);
}

module.exports = {
  getCompanies,
  addCompany,
  deleteCompany,
  getCompanyById,
};
