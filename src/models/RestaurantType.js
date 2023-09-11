module.exports = (sequelize, Datatypes) => {
  const RestaurantType = sequelize.define("RestaurantType", {
    restaurant_type_id : {
      type : Datatypes.INTEGER,
      allowNull : false,
      primaryKey : true,
      autoIncrement : true,
    },
    restaurant_type : {
      type : Datatypes.STRING(256),
      allowNull : false
    },
    restaurant_type_eng : {
      type : Datatypes.STRING(256),
      allowNull : false
    },

  }, {
    tableName : "RestaurantType",
    freezeTableName : true,
    charset : "utf8",
    collate : "utf8_general_ci",
    timestamps : false
  })
  RestaurantType.associate = function(models) {
    RestaurantType.hasMany(models.Restaurant, {
      foreignKey : "restaurant_type_id"
    })
  }
  return RestaurantType
}

