module.exports = (sequelize, Datatypes) => {
  const Menu = sequelize.define("Menu", {
    menu_id : {
      type : Datatypes.INTEGER,
      allowNull : false,
      primaryKey : true,
      autoIncrement : true
    },
    menu_name : {
      type : Datatypes.STRING(32)
    },
    menu_price : {
      type : Datatypes.INTEGER
    }
  }, {
    tableName : "Menu",
    freezeTableName : true,
    charset : "utf8",
    collate : "utf8_general_ci",
    timestamps : false
  })
  Menu.associate = function(models) {
    Menu.belongsTo(models.Restaurant, {
      foreignKey : "restaurant_id"
    })
  }
  return Menu
}
