// Route to query request based on specific query number 
const express = require("express");
const router = express.Router();
const fbBlenderController = require("../controllers/fbBlenderController");

router
  .route("/")
  .post(fbBlenderController.postQuery);

module.exports = router;
