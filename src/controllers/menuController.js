const {Restaurant, Menu} = require('../models')
const {Op} = require('sequelize')

exports.index = (req, res) => {
  res.send("1")
}
exports.searchMenu = (req, res) => {
  const {key} = req.params
  Menu.findAll({
    where : {
      menu_name : {
        [Op.like] : `%${key}%`
      }
    }
  })
  .then((response) => {
    res.send(response)
  })
}

exports.getRestaurantMenu = (req, res) => {
  const {restaurant_id} = req.params
  Menu.findAll({
    where : {restaurant_id : restaurant_id}
  })
  .then((response) => {
    res.send(response)
  })
}