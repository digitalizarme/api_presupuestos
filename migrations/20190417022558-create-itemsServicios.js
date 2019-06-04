"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("ItemsServicios", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      c_descripcion: {
        type: Sequelize.STRING,
        allowNull: false
      },
      n_id_presupuesto: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          key: "id",
          model: "Presupuestos"
        }
      },
      n_cantidad: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      n_unitario: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      n_exentas: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      n_gravadas_5: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      n_gravadas_10: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      n_cotizacion: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      c_monedaOrigemDestino: {
        type: Sequelize.STRING,
        allowNull: false
      },
      t_observacion: {
        type: Sequelize.TEXT
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
    return queryInterface.dropTable("ItemsServicios");
  }
};
