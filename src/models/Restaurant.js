const LikeRestaurant = require("./LikeRestaurant");

module.exports = (sequelize, Datatypes) => {
  const Restaurant = sequelize.define("Restaurant", {
    restaurant_id : {
      type : Datatypes.INTEGER,
      primaryKey : true,
      allowNull : false,
      autoIncrement : true
    },
    restaurant_name : {
      type : Datatypes.STRING(256),
      allowNull : false,
    },
    restaurant_phone : {
      type : Datatypes.STRING(256),
    },
    restaurant_address: {
      type : Datatypes.STRING(256),
    },
    restaurant_location_X : {
      type : Datatypes.STRING(256),
    },
    restaurant_location_Y : {
      type : Datatypes.STRING(256),
    },
    restaurant_kakao : {
      type : Datatypes.STRING(1024),
    },
    restaurant_naver : {
      type : Datatypes.STRING(1024)
    }
  }, {
    tableName : "Restaurant",
    freezeTableName : true,
    charset : "utf8",
    collate : "utf8_general_ci",
    timestamps : false
  })

  Restaurant.associate = function(models) {
    Restaurant.hasMany(models.Review, {
      foreignKey : 'restaurant_id'
    })
    // Restaurant.hasMany(models.Tag, {
    //   foreignKey : "tag_id",
    // });
    Restaurant.belongsToMany(models.LikeRestaurant, {
      foreignKey : 'restaurant_id',
      through : "LikeRestaurant"
    })
    Restaurant.hasMany(models.RestaurantImage, {
      foreignKey : "restaurant_id",
    });
    Restaurant.hasMany(models.Menu, {
      foreignKey : "restaurant_id"
    }) 
    Restaurant.belongsTo(models.RestaurantType, {
      foreignKey : "restaurant_type_id",
      as : "restaurant_type"
    });
    Restaurant.belongsToMany(models.User, {
      through : "LikeRestaurant",
      foreignKey : "restaurant_id",
    })
  }
  return Restaurant;
};