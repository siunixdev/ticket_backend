'use strict';
module.exports = (sequelize, DataTypes) => {
  const profile = sequelize.define('profile', {
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    no_telp: DataTypes.STRING,
    email: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  profile.associate = function(models) {
    // associations can be defined here
  };
  return profile;
};