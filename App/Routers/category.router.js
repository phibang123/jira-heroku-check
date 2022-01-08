const express = require("express");
const categoryRouter = express.Router();
const categoryController = require("../Controller/category.controller")
const {passport} = require("../Configs/passport") 

categoryRouter.get("",categoryController.getCategory)


module.exports = categoryRouter