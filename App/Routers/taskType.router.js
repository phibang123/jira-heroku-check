const express = require('express')
const taskTypeRouter = express.Router();
const taskTypeController  = require('../Controller/taskType.controller')




taskTypeRouter.get("/getAll",taskTypeController.getTaskType)


module.exports = taskTypeRouter