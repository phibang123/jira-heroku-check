const express = require("express");
const priorityRouter = express.Router();
const priorityController = require("../Controller/priority.controller")

const {passport} = require("../Configs/passport") 

priorityRouter.get("/getAll",priorityController.getPriority)


module.exports = priorityRouter