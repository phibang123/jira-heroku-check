const express = require("express");
const userRouter = express.Router();
const userController = require("../Controller/user.controller")
const { passport } = require("../Configs/passport")


userRouter.post("/signup", userController.signup)

userRouter.post("/signin", userController.signin)

userRouter.put("/editUser", userController.editUser)

userRouter.get("/getUser/keyword=:key", passport, userController.getUserByKey)

userRouter.get("/getUser/keyword=", passport, userController.getUserByKeyNull)

userRouter.get("/getUserByProjectId/idProject=:id",passport,userController.getUserByProjectId)

module.exports = userRouter