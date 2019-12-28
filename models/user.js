"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
      no_telp: DataTypes.STRING
    },
    {}
  );
  user.associate = function(models) {
    user.hasMany(models.event, {
      as: "event",
      foreignKey: "creator_user_id"
    });
  };
  return user;
};
