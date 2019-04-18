'use strict';

module.exports = (sequelize, DataTypes) => {
  const MediosPagos = sequelize.define('MediosPagos', {
    c_descripcion                       : {
      type   : DataTypes.STRING,
      unique : true
    },
    b_activo                    : DataTypes.BOOLEAN,
  }, {
    tableName: 'MediosPagos',
  });
  return MediosPagos;
};