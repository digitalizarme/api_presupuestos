'use strict';

module.exports = (sequelize, DataTypes) => {
  const Frecuencias = sequelize.define('Frecuencias', {
    c_descripcion                       : {
      type   : DataTypes.STRING,
      unique : true
    },
    n_cantidad_dias  : DataTypes.INTEGER,
    b_activo         : DataTypes.BOOLEAN,
  }, {
    tableName: 'Frecuencias',
  });


  return Frecuencias;
};