// Route to query request based on specific query number 
const express = require("express");
const router = express.Router();
const dialogptController = require("../controllers/dialogptController");

router
  .route("/")
  .post(dialogptController.postQuery);

module.exports = router;
