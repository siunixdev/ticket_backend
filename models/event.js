"use strict";
module.exports = (sequelize, DataTypes) => {
  const event = sequelize.define(
    "event",
    {
      title: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
      start_time: DataTypes.DATE,
      end_time: DataTypes.DATE,
      price: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      address: DataTypes.TEXT,
      url_maps: DataTypes.STRING,
      image: DataTypes.STRING,
      creator_user_id: DataTypes.INTEGER
    },
    {}
  );
  event.associate = function(models) {
    // associations can be defined here
  };
  return event;
};
