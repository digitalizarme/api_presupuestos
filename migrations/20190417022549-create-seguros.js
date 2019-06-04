"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Seguros", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      c_tipo_select2: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      c_tipo_campo_valor: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      c_valor_exhibir: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      n_id_moneda: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          key: "id",
          model: "monedas"
        }
      },
      n_valor: {
        allowNull: false,
        type: Sequelize.FLOAT
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
    return queryInterface.dropTable("Seguros");
  }
};
