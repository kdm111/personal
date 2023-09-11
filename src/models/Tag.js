const sequelize = require("sequelize");

const Tag = (sequelize, dataTypes) => {
  const Tag = sequelize.define("Tag", {
    tag_id : {
      type : dataTypes.INTEGER,
      primaryKey : true,
      allowNull : false,
      autoIncrement : true
    },
    tag_name : {
      type : dataTypes.STRING(256)
    }
  }, {
    tableName : "Tag",
    freezeTableName : true,
    charset : "utf8",
    collate : "utf8_general_ci",
    timestamps : false
  })
  return Tag
}

module.exports = Tag
