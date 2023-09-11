const express = require("express")
const restaurantTypeRouter = express.Router()
const restaurantTypeController = require("../controllers/restaurantTypeController.js")


restaurantTypeRouter.get("/:type", restaurantTypeController.getIndex)
// restaurantTypeRouter.get("/:type", restaurantTypeController.getTypeRestaurants)




module.exports = restaurantTypeRouter;