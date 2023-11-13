// Route to query request based on specific query number 
const express = require("express");
const router = express.Router();
const eleutherController = require("../controllers/eleutherController");

router
  .route("/")
  .post(eleutherController.postQuery);

module.exports = router;
