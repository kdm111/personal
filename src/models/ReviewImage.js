module.exports = (sequelize, DataTypes) => {
  const ReviewImage = sequelize.define(
    'ReviewImage',
    {
      image_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      image_url: {
        type: DataTypes.STRING(1024),
        allowNull: true,
      },
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'review_images',
      freezeTableName: true,
    },
  );

  ReviewImage.associate = models => {
    ReviewImage.belongsTo(models.Review, {
      foreignKey: 'review_id',
      targetKey : 'review_id',
      onDelete : 'CASCADE'
    });
  };

  return ReviewImage;
};
