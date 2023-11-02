// Route to query request based on specific query number 
const express = require("express");
const router = express.Router();
const mistralaiController = require("../controllers/mistralaiController");

router
  .route("/")
  .post(mistralaiController.postQuery);

module.exports = router;
