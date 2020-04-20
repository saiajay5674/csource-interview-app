const express = require("express");
const router = express.Router();
const companyController = require("../controllers/company.controller");

//Get ALL companies
router.get("/", companyController.getCompanies);

//get Company by ID
router.get("/:id", companyController.getCompanyById);

//Get company by user ID
router.get('/user/:id', companyController.getCompanyByUser);

//Create new company
router.post("/", companyController.addCompany);

//Delete a company
router.delete("/:id", companyController.deleteCompany);

module.exports = router;
