const express = require('express');
const categoryRouter = require('./category.router')
const userRouter = require('./user.router')
const statusRouter = require('./status.router')
const priorityRouter = require('./priority.router')
const taskTypeRouter = require('./taskType.router')
const projectRouter = require('./project.router');
const taskRouter = require('./task.router');
const commentRouter = require('./comment.router')
const router = express.Router();

//url <=> http://localhost:3000/students
//cái /students nó tự add vào url
//ProjectCategory
router.use("/api/ProjectCategory", categoryRouter);

//User
router.use("/api/Users",userRouter);

//Status
router.use("/api/Status", statusRouter);

//Priority
router.use("/api/Priority", priorityRouter);

//taskType
router.use("/api/TaskType", taskTypeRouter);

//Project
router.use("/api/Project", projectRouter)

//Task
router.use("/api/Task", taskRouter)

//Comment
router.use("/api/Comment", commentRouter)

module.exports = router