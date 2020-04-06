const express = require('express');
const router = express.Router();
const companyController = require('../controllers/company.controller');


//Get ALL companies
router.get('/', companyController.getCompanies);

//Create new company
router.post('/', companyController.addCompany);

//Delete a company
router.delete('/:id', companyController.deleteCompany);


module.exports = router;