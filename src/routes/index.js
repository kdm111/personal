const express = require('express');
const router = express.Router();
const userRouter = require('./user.js')
const restaurantRouter = require('./restaurantRouter.js')
const restaurantTypeRouter = require('./restaurantTypeRouter.js')
const reviewRouter = require('./reviewRouter.js')
const likeRestaurantRouter = require('./likeRestaurantRouter.js')
const menuRouter = require('./menuRouter.js')
const tagRouter = require('./tagRouter.js')
const restaurantImageRouter = require('./restaurantImageRouter.js')
const indexRouter = require('./indexRouter.js')


router.use('/api/user', userRouter)
router.use('/api/restaurant', restaurantRouter)
router.use('/api/restaurant_type', restaurantTypeRouter)
router.use('/api/review', reviewRouter)
router.use('/api/like', likeRestaurantRouter)
router.use('/api/menu', menuRouter)
router.use('/api/tag', tagRouter)
router.use('/api/restaurant_image', restaurantImageRouter)

router.use('/', indexRouter)

module.exports = router;
