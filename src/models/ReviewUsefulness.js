module.exports = (sequelize, DataTypes) => {
  const ReviewUsefulness = sequelize.define(
    'ReviewUsefulness',
    {
      review_usefulness_id : {
        type : DataTypes.INTEGER,
        allowNull : false,
        primaryKey: true
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'review_usefulness',
      indexes: [
        {
          unique: true,
          fields: ['review_id', 'user_id'],
        },
      ],
      hasTrigger: true,
    },
  );

  ReviewUsefulness.associate = function (models) {
    ReviewUsefulness.belongsTo(models.Review, {
      foreignKey: 'review_id',
      as: 'Review',
    });
    ReviewUsefulness.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'User',
    });
  };

  return ReviewUsefulness;
};
