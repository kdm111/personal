module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    'Review',
    {
      review_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      // restaurant_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: 'Restaurant',
      //     key: 'restaurant_id',
      //   },
      // },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      rating: {
        type: DataTypes.DECIMAL(2, 1),
        allowNull: false,
        validate: {
          min: 0,
          max: 5,
        },
      },
    },
    {
      timestamps: true,
      underscored: true,
      tableName: 'review',
    },
  );

  Review.associate = function (models) {
    Review.belongsTo(models.Restaurant, {
      foreignKey : "restaurant_id",
    });
    Review.hasMany(models.ReviewImage, {
      foreignKey: 'image_id',
      as : 'image_id'
    });
    // Review.hasMany(models.ReviewUsefulness, {
    //   foreignKey: 'review_id',
    //   as: 'ReviewUsefulness',
    // });
  };

  return Review;
};
