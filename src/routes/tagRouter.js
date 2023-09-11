const express = require("express")
const tagRouter = express.Router()
const tagController = require("../controllers/tagController.js")

tagRouter.get('/all',tagController.getAllTags)

module.exports = tagRouter