

const express = require("express");
const statusRouter = express.Router();
const statusController = require("../Controller/status.controller")


statusRouter.get("/getAll", statusController.getStatus)



module.exports = statusRouter