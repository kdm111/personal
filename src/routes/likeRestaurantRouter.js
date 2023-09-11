const express = require("express")
const likeRestaurantRouter = express.Router()
const likeRestaurantController = require("../controllers/likeRestaurantController.js")


likeRestaurantRouter.get("", likeRestaurantController.getUserLikes)
likeRestaurantRouter.post("", likeRestaurantController.postLike)
likeRestaurantRouter.delete("", likeRestaurantController.deleteLike)


module.exports = likeRestaurantRouter