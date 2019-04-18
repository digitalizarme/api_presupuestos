'use strict';

module.exports = (sequelize, DataTypes) => {
  const MercaderiasMarcas = sequelize.define('MercaderiasMarcas', {
    c_descripcion                       : {
      type   : DataTypes.STRING,
      unique : true
    },
    b_activo                    : DataTypes.BOOLEAN,
  }, {
    tableName: 'MercaderiasMarcas',
  });
  return MercaderiasMarcas;
};