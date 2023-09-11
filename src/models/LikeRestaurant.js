module.exports = (sequelize, Datatypes) => {
  const LikeRestaurant = sequelize.define("LikeRestaurant", {
    like_restaurant_id : {
      type : Datatypes.INTEGER,
      allowNull : false,
      primaryKey : true,
      autoIncrement : true
    }
  }, {
    tableName : "LikeRestaurant",
    freezeTableName : true,
    charset : "utf8",
    collate : "utf8_general_ci",
    timestamps : false
  })
  LikeRestaurant.associate = function(models) {
    // LikeRestaurant.belongsToMany(models.User, {
    //   foreignKey : "id"
    // })
    // LikeRestaurant.belongsToMany(models.Restaurant, {
    //   foreignKey : "restaurant_id"
    // })
  }
  return LikeRestaurant
};