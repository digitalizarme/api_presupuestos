'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      c_id_persona: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: 'personas',
        }
        ,validate: {
          notEmpty: false,
        }


      },
      c_usuario: {
        allowNull: false,
        type: Sequelize.STRING
        ,unique   : true
        ,validate: {
          notEmpty: false,
          len: {
            args: [5, 50],
          }
        }


      },
      c_contrasena: {
        allowNull: false,
        type: Sequelize.STRING
        ,validate: {
          notEmpty: false,
          len: {
            args: [5, 50],
          }
        }

      },
      b_activo: {
        allowNull: false,
        type: Sequelize.BOOLEAN
        ,defaultValue  : true

      },
      b_administrador: {
        type: Sequelize.BOOLEAN
        ,defaultValue  : false

      },
      b_cadastrar: {
        type: Sequelize.BOOLEAN
        ,defaultValue  : true

      },
      b_editar: {
        type: Sequelize.BOOLEAN
        ,defaultValue  : true

      },
      b_eliminar: {
        type: Sequelize.BOOLEAN
        ,defaultValue  : true

      },
      b_imprimir: {
        type: Sequelize.BOOLEAN
        ,defaultValue  : true

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
    return queryInterface.dropTable('Usuarios');
  }
};