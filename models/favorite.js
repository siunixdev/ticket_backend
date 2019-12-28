"use strict";
module.exports = (sequelize, DataTypes) => {
  const favorite = sequelize.define(
    "favorite",
    {
      creator_user_id: DataTypes.INTEGER,
      event_id: DataTypes.INTEGER
    },
    {}
  );
  favorite.associate = function(models) {
    // associations can be defined here
    favorite.belongsTo(models.user, {
      foreignKey: "creator_user_id",
      sourceKey: "id"
    });

    favorite.belongsTo(models.event, {
      foreignKey: "event_id",
      sourceKey: "id"
    });
  };
  return favorite;
};
