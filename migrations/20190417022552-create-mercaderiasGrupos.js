"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("MercaderiasGrupos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      c_descripcion: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      n_id_flete: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: "id",
          model: "fletes"
        }
      },
      b_activo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
    return queryInterface.dropTable("MercaderiasGrupos");
  }
};
