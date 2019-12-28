'use strict';
module.exports = (sequelize, DataTypes) => {
  const favorite = sequelize.define('favorite', {
    creator_user_id: DataTypes.INTEGER,
    event_id: DataTypes.INTEGER
  }, {});
  favorite.associate = function(models) {
    // associations can be defined here
  };
  return favorite;
};