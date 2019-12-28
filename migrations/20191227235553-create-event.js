"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("events", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      category_id: {
        type: Sequelize.INTEGER,
        // allowNull: false,
        references: {
          model: "categories",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      start_time: {
        type: Sequelize.DATE
      },
      end_time: {
        type: Sequelize.DATE
      },
      price: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
      },
      address: {
        type: Sequelize.TEXT
      },
      url_maps: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      creator_user_id: {
        type: Sequelize.INTEGER,
        // allowNull: false,
        references: {
          model: "users",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("events");
  }
};
