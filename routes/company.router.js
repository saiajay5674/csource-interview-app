const express = require("express");
const router = express.Router();
const companyController = require("../controllers/company.controller");

//Get ALL companies
router.get("/", companyController.getCompanies);

//Create new company
router.post("/", companyController.addCompany);

//Delete a company
router.delete("/:id", companyController.deleteCompany);

//get Company by ID
router.get("/:id", companyController.getCompanyById);

module.exports = router;
