"use strict";
module.exports = (sequelize, DataTypes) => {
  const payment = sequelize.define(
    "payment",
    {
      creator_user_id: DataTypes.INTEGER,
      event_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      total_price: DataTypes.INTEGER,
      status: DataTypes.STRING,
      attachment: DataTypes.STRING
    },
    {}
  );
  payment.associate = function(models) {
    // associations can be defined here
    payment.belongsTo(models.user, {
      foreignKey: "creator_user_id",
      sourceKey: "id"
    });

    payment.belongsTo(models.event, {
      foreignKey: "event_id",
      sourceKey: "id"
    });
  };
  return payment;
};
