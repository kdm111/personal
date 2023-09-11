const {RestaurantImage} = require('../models')


exports.getRestaurantImages = (req, res) => {
  RestaurantImage.findAll({
    where : {restaurant_id : req.params.restaurant_id}
  })
  .then((response) => {
    res.send(response)
  })
}