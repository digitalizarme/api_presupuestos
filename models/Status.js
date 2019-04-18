'use strict';

module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define('Status', {
    c_descripcion                       : {
      type   : DataTypes.STRING,
      unique : true
    },
    b_activo          : DataTypes.BOOLEAN,
  }, {
    tableName: 'Status',
  });
  return Status;
};