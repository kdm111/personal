const express = require('express')
const restaurantImageRouter = express.Router()
const restaurantImageController = require("../controllers/restaurantImageController.js")

/**
 * @swagger
 * /api/restaurant_image/:restaurant_id:
 * 
 *  get:
 *    summary: "한 개의 식당 이미지 조회"
 *    description: "요청 경로를 보낸다.."
 *    tags: [RestaurantImage]
 *    parameter:
 *      restaurant_id
 *    responses:
 *      "200":
 *        description: 식당 아이디를 전달하면 json파일이 배열로 반환됩니다. 
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: array
 *                data:
 *                  type: object
 *                  example: [{ "restaurant_image_id": 8191, "restaurant_image_url": "https://mblogthumb-phinf.pstatic.net/MjAyMjEwMDVfMTc2/MDAxNjY0OTQxMzM5MDY1.2sPzJZWT5m0KsKIzJ7HfP1SnnbeSEXq9OcEDL9VyA-og.6ys9aq8CmRAspYi1RJ8ejlsL_BlZ4esTqRZPUtIrBXAg.JPEG.pigletjiayou/1664940699633%EF%BC%8D2.jpg?type=w800", "restaurant_id": 1}, {"restaurant_image_id": 8192, "restaurant_image_url": "https://t1.daumcdn.net/cfile/tistory/99B8CD385F7C1BD40C", "restaurant_id": 1}]
 */
restaurantImageRouter.get("/:restaurant_id", restaurantImageController.getRestaurantImages)

module.exports = restaurantImageRouter