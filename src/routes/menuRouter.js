const express = require('express')
const menuRouter = express.Router()
const menuController = require('../controllers/menuController.js')

menuRouter.get('/search/:key', menuController.searchMenu)
menuRouter.get('/restaurant/:restaurant_id', menuController.getRestaurantMenu)


module.exports = menuRouter