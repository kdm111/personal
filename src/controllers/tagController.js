const { Tag } = require("../models")


exports.getAllTags = (req, res) => {
  Tag.findAll()
  .then((response) => {
    res.send(response)
  })
}

// exports.getTagRestaurant = (req, res) => {
//   const {tag} = req.params

//   tagModels.findOne({
//     where : {tag_name : tag}
//   })
//   .then((response) => {
//     const tagId = response.dataValues.id
//     tagRestaurantModels.findAll({
//       where : {tag_id : tagId}
//     })
//     .then((response) => {
//       res.send(response.dataValues)
//     })
//   })
// }