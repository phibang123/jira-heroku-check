const express = require("express");
const taskRouter = express.Router();
const taskController = require("../Controller/task.controller");
const { passport } = require("../Configs/passport")
const { passportProject } = require("../Configs/passportProject");

//taskRouter.get("",)

//updateStatus Task
taskRouter.put("/updateStatus", passport, taskController.updateStatus)


//updatePriority Task
taskRouter.put("/updatePriority", passport, taskController.updatePriority)


//updatePriority Task
taskRouter.put("/updateDescription", passport, taskController.updateDescription)


//updateTimeTracking Task
taskRouter.put("/updateTimeTracking", passport, taskController.updateTimeTracking)


//updateTimeTracking Task
taskRouter.put("/updateEstimate", passport, taskController.updateEstimate)


//addAssignTask Task
taskRouter.post("/assignUserTask", passport, taskController.addUserAssignTask)


//removeAssignTask Task
taskRouter.post("/removeUserFromTask",passport, taskController.removeUserAssignTask)


//createTask Task
//nhớ sữa
//1: check user ass project mới có user reporter

taskRouter.post("/createTask", passport,taskController.createTask)


//updateTask Task
//nhớ sữa
//2: kiểm tra có phải user reporter hay ko
taskRouter.post("/updateTask", passport, taskController.updateTask)


//getDetail Task
taskRouter.get("/getTaskDetail/taskId=:id", passport,taskController.getTaskDetail)


//deleteTask Task
taskRouter.delete("/removeTask/taskId=:id", passport, taskController.deleteTask)


//deleteTask Task
taskRouter.get("/getAllTask/project=:id", passport ,taskController.getAllTaskByProjectId)

module.exports = taskRouter