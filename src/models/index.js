const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const dotenv = require('dotenv');
dotenv.config();
const db = {};

const sequelize = new Sequelize(
  process.env.DB_DATABASE_NAME,
  process.env.DB_USER_NAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

fs.readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js',
  )
  .forEach(file => {
    console.log(file);
    const model = require(`./${file}`)(sequelize, Sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// db.User = require('./User')(sequelize, Sequelize);
// db.RestaurantType = require("./RestaurantType")(sequelize, Sequelize);
// db.Restaurant = require("./Restaurant")(sequelize, Sequelize);
// db.LikeRestaurant = require("./LikeRestaurant")(sequelize, Sequelize);
// db.Review = require("./Review")(sequelize, Sequelize);

module.exports = db;
