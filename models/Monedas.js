'use strict';

module.exports = (sequelize, DataTypes) => {
  const Monedas = sequelize.define('Monedas', {
    c_descripcion                       : {
      type   : DataTypes.STRING,
      unique : true
    },
    c_simbolo                       : {
      type   : DataTypes.STRING,
      unique : true
    },
    c_letras                       : {
      type   : DataTypes.STRING,
      unique : true
    },
    n_decimales                       : {
      type   : DataTypes.INTEGER,
    },
    b_activo                       : {
      type   : DataTypes.BOOLEAN,
    },
  }, {
    tableName: 'Monedas',
  });
  return Monedas;
};