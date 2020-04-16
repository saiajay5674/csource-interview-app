const express = require("express");
const app = express();
const router = express.Router();
const careerfairController = require("../controllers/careerfair.controller");

//Get ALL career fairs
router.get("/", careerfairController.getCareerfairs);

//Get current careerfair
router.get("/current", careerfairController.getCurrent);

//Get current populated
router.get('/current/:id', careerfairController.getCurrentPopulated);

//Get a specific careerfair
router.get("/:id", careerfairController.getCareerfair);

//Create new career fair
router.post("/", careerfairController.addCareerfair);

//Delete a career fair
router.delete("/:id", careerfairController.deleteCareerfair);

//Update number of companies at a careerfair
router.patch("/company/:id", careerfairController.updateCompanyList);

router.patch("/interview/:id", careerfairController.addInterview);

//Set a career fair to current careerfair
router.patch("/current/:id", careerfairController.setCurrent);

module.exports = router;
