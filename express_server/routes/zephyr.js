// Route to query request based on specific query number 
const express = require("express");
const router = express.Router();
const zephyrController = require("../controllers/zephyrController");

router
  .route("/")
  .post(zephyrController.postQuery);

module.exports = router;
