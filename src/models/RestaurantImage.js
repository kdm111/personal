module.exports = (sequelize, Datatypes) => {
  const RestaurantImage = sequelize.define("RestaurantImage", {
    restaurant_image_id : {
      type : Datatypes.INTEGER,
      allowNull : false,
      primaryKey : true,
      autoIncrement : true
    },
    restaurant_image_url : {
      type : Datatypes.STRING(2048),
    }
  }, {
    tableName : "RestaurantImage",
    freezeTableName : true,
    charset : "utf8",
    collate : "utf8_general_ci",
    timestamps : false
  })
  RestaurantImage.associate = function(models) {
    RestaurantImage.belongsTo(models.Restaurant, {
      foreignKey : "restaurant_id",
      onDelete : "CASCADE"
    })
  }
  return RestaurantImage
}
