'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Personas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      c_nombre: {
        allowNull: false,
        type: Sequelize.STRING
        ,validate: {
          notEmpty: false,
          len: {
            args: [5, 50],
          }
        }
      },
      c_identificacion: {
        allowNull: false,
        type: Sequelize.STRING,
        unique:true
        ,validate: {
          notEmpty: false,
          len: {
            args: [5, 50],
          }
        }

      },
      c_email: {
        allowNull: false,
        type     : Sequelize.STRING,
        unique   : true,
        validate : {
          notEmpty: false,
          isEmail: true
        }
      },
      c_tel1: {
        type: Sequelize.STRING
      },
      c_tel2: {
        type: Sequelize.STRING
      },
      c_cel1: {
        allowNull: false,
        type: Sequelize.STRING
        ,validate: {
          notEmpty: false,
          len: {
            args: [5, 50],
          }
        }

      },
      c_cel2: {
        type: Sequelize.STRING
      },
      c_contacto: {
        type: Sequelize.STRING
      },
      c_direccion: {
        allowNull: false,
        type: Sequelize.STRING
        ,validate: {
          notEmpty: false,
          len: {
            args: [5, 100],
          }
        }

      },
      n_valor_porcentaje_comision: {
        type: Sequelize.FLOAT
      },
      b_activo: {
        type: Sequelize.BOOLEAN
        ,defaultValue  : false

      },
      b_cliente: {
        type: Sequelize.BOOLEAN
        ,defaultValue  : false
      },
      b_comisionista: {
        type: Sequelize.BOOLEAN
        ,defaultValue  : false

      },
      b_funcionario: {
        type: Sequelize.BOOLEAN
        ,defaultValue  : false

      },
      b_usuario: {
        type: Sequelize.BOOLEAN
        ,defaultValue  : false

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
    return queryInterface.dropTable('Personas');
  }
};