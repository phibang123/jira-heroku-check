const express = require("express");
const commentRouter = express.Router();
const commentController = require("../Controller/comment.controller")
const {passport} = require("../Configs/passport") 



commentRouter.post("/insertComment",passport ,commentController.insertComment)

commentRouter.delete("/deleteComment/idComment=:id", passport, commentController.deleteComment)

//commentRouter.get("/getAll/taskId=:id", commentController.getAllCommentTask)

module.exports = commentRouter