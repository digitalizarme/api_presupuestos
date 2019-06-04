"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Servicios", {
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
      c_unidad: {
        type: Sequelize.STRING,
        allowNull: false
      },
      n_id_grupo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: "id",
          model: "ServiciosGrupos"
        }
      },
      b_activo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      t_observacion: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      n_comision: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      n_iva: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      n_valor: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      n_id_moneda: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: "id",
          model: "monedas"
        }
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
    return queryInterface.dropTable("Servicios");
  }
};
