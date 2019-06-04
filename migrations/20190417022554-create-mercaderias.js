"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Mercaderias", {
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
      c_codigo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      c_unidad: {
        type: Sequelize.STRING,
        allowNull: false
      },
      n_id_marca: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          key: "id",
          model: "mercaderiasMarcas"
        }
      },
      n_id_grupo: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          key: "id",
          model: "mercaderiasGrupos"
        }
      },
      n_id_subgrupo: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          key: "id",
          model: "mercaderiasSubGrupos"
        }
      },
      n_iva: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      n_id_moneda: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          key: "id",
          model: "monedas"
        }
      },
      n_costo: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      n_venta: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      n_peso: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      b_activo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
    return queryInterface.dropTable("Mercaderias");
  }
};
