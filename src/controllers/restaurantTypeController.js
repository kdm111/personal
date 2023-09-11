const {Restaurant, RestaurantType} = require("../models")

exports.getIndex = (req, res) => {
  const {type} = req.params
  const restaurant_type_eng = type
  RestaurantType.findOne({
    where : {restaurant_type_eng : restaurant_type_eng}
  })
  .then((restaurantTypeRecord) => {
    console.log(restaurantTypeRecord)
    Restaurant.findAll({
      where : {restaurant_type : restaurantTypeRecord.restaurant_type_id}
    })
    .then((response) => {
      res.send(response)
    })
  })
}
exports.getTypeRestaurants = (req, res) => {
  // const {type} = req.params
  res.send("1")
  // const {type_eng_name} = req.params
  // console.log(type_eng_name)
  // res.send(type_eng_name)
  // typeModels.findOne({
  //   where : {type_eng_name : type_eng_name}
  // })
  // .then((response) => {
  //   const typeId = response.dataValues.id
  //   restaurantModels.findAll({
  //     where : {restaurant_type : typeId}
  //   })
  //   .then((response) => {
  //     res.send(response.dataValues)
  //   })
  // })
}